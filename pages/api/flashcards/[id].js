// pages/api/flashcards/[id].js
import { query } from '../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'Flashcard ID is required' });
  }

  if (req.method === 'GET') {
    try {
      const result = await query(
        'SELECT * FROM flashcards WHERE flashcard_id = $1',
        [id]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Flashcard not found' });
      }
      
      return res.status(200).json({ flashcard: result.rows[0] });
    } catch (error) {
      console.error('Error fetching flashcard:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}