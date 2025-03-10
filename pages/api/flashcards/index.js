// pages/api/flashcards/index.js
import { query } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const category = req.query.category ? req.query.category : null;
      
      let queryText;
      let queryParams = [];
      
      if (category) {
        queryText = 'SELECT * FROM flashcards WHERE category = $1 ORDER BY content';
        queryParams = [category];
      } else {
        queryText = 'SELECT * FROM flashcards ORDER BY category, content';
      }
      
      const result = await query(queryText, queryParams);
      return res.status(200).json({ flashcards: result.rows });
    } catch (error) {
      console.error('Error fetching flashcards:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}