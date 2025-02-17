// pages/api/test.js
import Airtable from 'airtable';

export default async function handler(req, res) {
  try {
    console.log('Testing Airtable connection...');
    const base = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY
    }).base(process.env.AIRTABLE_BASE_ID);

    // Try to read from the users table
    const records = await base('Users').select({
      maxRecords: 1
    }).firstPage();

    console.log('Successfully connected to Airtable! Found records:', records.length);

    return res.status(200).json({ 
      success: true, 
      message: 'Successfully connected to Airtable' 
    });
  } catch (error) {
    console.error('Connection test error:', {
      message: error.message,
      status: error.statusCode,
      error: error.error
    });

    return res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
}