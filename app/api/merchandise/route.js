import dbConnect from '../../lib/mongodb';
import Merchandise from '../../models/Merchandise';

// GET: Fetch all merchandise
export async function GET() {
  await dbConnect();
  try {
    const merchandise = await Merchandise.find({});
    return new Response(JSON.stringify(merchandise), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });} catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 400 });
  }
}

// POST: Add new merchandise
export async function POST(req) {
  const body = await req.json();
  if (!body.name || !body.price || !body.image || !body.category) {
    return new Response(JSON.stringify({
      success: false,
      error: "All fields (name, price, image, category) are required."
    }), { status: 400 });
  }
  await dbConnect();
  try {
    const newMerchandise = new Merchandise(body);
    await newMerchandise.save();
    return new Response(JSON.stringify({ success: true, data: newMerchandise }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 400 });
  }
}

// PATCH: Update merchandise by id
export async function PATCH(req) {
  const { id } = req.query;  // Merchandise id passed as query parameter
  const body = await req.json();
  await dbConnect();
  try {
    const updatedMerchandise = await Merchandise.findByIdAndUpdate(id, body, { new: true });
    if (!updatedMerchandise) {
      return new Response(JSON.stringify({ success: false, message: 'Merchandise not found' }), { status: 404 });
    }
    return new Response(JSON.stringify({ success: true, data: updatedMerchandise }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 400 });
  }
}

// DELETE: Remove merchandise by id
export async function DELETE(req) {
  const { id } = req.query;  // Merchandise id passed as query parameter
  await dbConnect();
  try {
    const deletedMerchandise = await Merchandise.findByIdAndDelete(id);
    if (!deletedMerchandise) {
      return new Response(JSON.stringify({ success: false, message: 'Merchandise not found' }), { status: 404 });
    }
    return new Response(JSON.stringify({ success: true, message: 'Merchandise deleted' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 400 });
  }
}
