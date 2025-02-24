// pages/api/auth/signup.js
import Airtable from 'airtable';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const base = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY
    }).base(process.env.AIRTABLE_BASE_ID);

    const { email, password, firstName, lastName, username } = req.body;

    console.log('Attempting to create record with:', {
      email,
      firstName,
      lastName,
      username
    });

    // Create the record with only non-computed fields
    const createdRecords = await base('users').create([
      {
        fields: {
          username,
          firstName,
          lastName,
          email,
          password,
          'Bookmarked Flashcards': ''
        }
      }
    ]);

    console.log('Record created successfully:', createdRecords[0].id);

    return res.status(201).json({
      message: 'User created successfully',
      user: {
        id: createdRecords[0].id,
        ...createdRecords[0].fields
      }
    });

  } catch (error) {
    console.error('Full error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      error: error
    });

    return res.status(500).json({ 
      message: `Error creating user: ${error.message}`
    });
  }
}