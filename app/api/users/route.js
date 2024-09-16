import dbConnect from '../../lib/mongodb';
import Vituser from '../../models/Vituser';

export async function POST(req) {
    try {
      await dbConnect();
      const { name, email } = await req.json();
      if (!name || !email) {
        return new Response(JSON.stringify({ error: 'Missing required fields: name and email' }), { status: 400 });
      }
      const newUser = new Vituser({ name, email });
      await newUser.save();
      return new Response(JSON.stringify(newUser), { status: 201 });
    } catch (error) {
      console.error('Error creating user:', error);
      return new Response(JSON.stringify({ error: error.message || 'Error creating user' }), { status: 500 });
    }
}

export async function GET(req) {
    try {
      await dbConnect();
      const users = await Vituser.find({});
      return new Response(JSON.stringify(users), { status: 200 });
    } catch (error) {
      console.error('Error fetching users:', error);
      return new Response(JSON.stringify({ error: error.message || 'Error fetching users' }), { status: 500 });
    }
}

export async function PATCH(req) {
    try {
      await dbConnect();
      const { id, name, email } = await req.json();
      if (!id) {
        return new Response(JSON.stringify({ error: 'Missing required field: id' }), { status: 400 });
      }
      const updatedUser = await Vituser.findByIdAndUpdate(id, { name, email }, { new: true });
      if (!updatedUser) {
        return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
      }
      return new Response(JSON.stringify(updatedUser), { status: 200 });
    } catch (error) {
      console.error('Error updating user:', error);
      return new Response(JSON.stringify({ error: error.message || 'Error updating user' }), { status: 500 });
    }
}

export async function DELETE(req) {
    try {
      await dbConnect();
      const { id } = await req.json();
      if (!id) {
        return new Response(JSON.stringify({ error: 'Missing required field: id' }), { status: 400 });
      }
      const deletedUser = await Vituser.findByIdAndDelete(id);
      if (!deletedUser) {
        return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ message: 'User deleted successfully' }), { status: 200 });
    } catch (error) {
      console.error('Error deleting user:', error);
      return new Response(JSON.stringify({ error: error.message || 'Error deleting user' }), { status: 500 });
    }
}