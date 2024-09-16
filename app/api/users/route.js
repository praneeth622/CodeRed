import dbConnect from '../../lib/mongodb';
import Vituser from '../../models/Vituser';

export async function POST(req) {
    try {
      // Connect to the database
      await dbConnect();
  
      // Parse the incoming request
      const { name, email } = await req.json();
      if (!name || !email) {
        return new Response(JSON.stringify({ error: 'Missing required fields: name and email' }), { status: 400 });
      }
  
      // Create a new user instance
      const newUser = new Vituser({ name, email });
  
      // Save the new user to the database
      await newUser.save();
  
      // Return the newly created user
      return new Response(JSON.stringify(newUser), { status: 201 });
    } catch (error) {
      console.error('Error creating user:', error);
      return new Response(JSON.stringify({ error: error.message || 'Error creating user' }), { status: 500 });
    }
  }