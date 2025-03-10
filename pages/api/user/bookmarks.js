// pages/api/user/bookmarks.js
import { withAuth } from '../../../middleware/auth';
import { query } from '../../../lib/db';

const handler = async (req, res) => {
  try {
    // Get the user's bookmarked flashcards
    const result = await query(
      `SELECT f.* 
       FROM flashcards f
       JOIN bookmarks b ON f.flashcard_id = b.flashcard_id
       WHERE b.user_id = $1
       ORDER BY b.bookmarked_at DESC`,
      [req.user.user_id]
    );

    return res.status(200).json({ 
      message: 'Bookmarks retrieved successfully', 
      flashcards: result.rows 
    });
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    return res.status(500).json({ message: 'Failed to fetch bookmarks' });
  }
};

export default withAuth(handler);