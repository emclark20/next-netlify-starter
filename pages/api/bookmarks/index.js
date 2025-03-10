// pages/api/bookmarks/index.js
import { withAuth } from '../../../middleware/auth';
import { query } from '../../../lib/db';

const handler = async (req, res) => {
  const userId = req.user.user_id;

  // GET request to fetch user's bookmarked flashcards
  if (req.method === 'GET') {
    try {
      const result = await query(
        `SELECT f.*, true as is_bookmarked
         FROM flashcards f
         JOIN bookmarks b ON f.flashcard_id = b.flashcard_id
         WHERE b.user_id = $1
         ORDER BY f.category, f.content`,
        [userId]
      );
      
      return res.status(200).json({ bookmarks: result.rows });
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
      return res.status(500).json({ message: 'Failed to fetch bookmarks' });
    }
  }
  
  // POST request to add a bookmark
  else if (req.method === 'POST') {
    try {
      const { flashcardId } = req.body;
      
      if (!flashcardId) {
        return res.status(400).json({ message: 'Flashcard ID is required' });
      }
      
      // Check if the bookmark already exists
      const checkResult = await query(
        'SELECT * FROM bookmarks WHERE user_id = $1 AND flashcard_id = $2',
        [userId, flashcardId]
      );
      
      if (checkResult.rows.length > 0) {
        return res.status(409).json({ message: 'Bookmark already exists' });
      }
      
      // Add the bookmark
      await query(
        'INSERT INTO bookmarks (user_id, flashcard_id) VALUES ($1, $2)',
        [userId, flashcardId]
      );
      
      return res.status(201).json({ message: 'Bookmark added successfully' });
    } catch (error) {
      console.error('Error adding bookmark:', error);
      return res.status(500).json({ message: 'Failed to add bookmark' });
    }
  }
  
  // DELETE request to remove a bookmark
  else if (req.method === 'DELETE') {
    try {
      const { flashcardId } = req.query;
      
      if (!flashcardId) {
        return res.status(400).json({ message: 'Flashcard ID is required' });
      }
      
      await query(
        'DELETE FROM bookmarks WHERE user_id = $1 AND flashcard_id = $2',
        [userId, flashcardId]
      );
      
      return res.status(200).json({ message: 'Bookmark removed successfully' });
    } catch (error) {
      console.error('Error removing bookmark:', error);
      return res.status(500).json({ message: 'Failed to remove bookmark' });
    }
  }
  
  else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
};

export default withAuth(handler);