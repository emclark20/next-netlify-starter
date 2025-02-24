// pages/api/auth/signup.js
import Airtable from 'airtable';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  console.log('Using base ID:', process.env.AIRTABLE_BASE_ID);

  try {
    // Initialize Airtable - remove the Bearer prefix, Airtable adds it automatically
    const base = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY // Remove 'Bearer ' prefix
    }).base(process.env.AIRTABLE_BASE_ID);

    const { email, password, firstName, lastName, username } = req.body;

    console.log('Attempting to create record with:', {
      email,
      firstName,
      lastName,
      username
    });

    // Create the record
    const createdRecords = await base('users').create([
      {
        fields: {
          username,
          firstName,
          lastName,
          email,
          password,
          'Full Name': `${firstName} ${lastName}`,
          'Email Domain': email.split('@')[1],
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