import dbConnect from '../../lib/mongodb';
import Event from '../../models/Event';

export async function POST(req) {
  try {
    // Parse the request body
    const body = await req.json();

    // Ensure required fields are present
    const { eventName, description, eventType, price, schedule, startTime, endTime, coordinators, eventImage } = body;

    if (!eventName || !description || !eventType || !price || !schedule || !startTime || !endTime || !eventImage) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'All required fields must be provided (eventName, description, eventType, price, schedule, startTime, endTime, eventImage)',
        }),
        { status: 400 }
      );
    }

    // Ensure eventType is one of the valid values
    const validEventTypes = ['Festivals', 'Competitions', 'Performance', 'Workshop'];
    if (!validEventTypes.includes(eventType)) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid event type' }), { status: 400 });
    }

    // Connect to the database
    await dbConnect();

    // Create the event in the database
    const event = await Event.create({
      eventName,
      description,
      eventType,
      price,
      schedule: {
        date: schedule,
        startTime,
        endTime,
      },
      coordinators,
      eventImage,
    });

    // Return success response
    return new Response(JSON.stringify({ success: true, data: event }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 400 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const events = await Event.find({});
    return new Response(JSON.stringify({ success: true, data: events }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 400 });
  }
}

// PATCH: Update an event by its id
export async function PATCH(req) {
  try {
    await dbConnect();

    // Use URLSearchParams to extract the query params
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ success: false, error: 'Event ID is required' }), { status: 400 });
    }

    const body = await req.json();
    const updatedEvent = await Event.findByIdAndUpdate(id, body, { new: true });

    if (!updatedEvent) {
      return new Response(JSON.stringify({ success: false, message: 'Event not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true, data: updatedEvent }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 400 });
  }
}

// DELETE: Remove an event by its id
export async function DELETE(req) {
  try {
    await dbConnect();

    // Use URLSearchParams to extract the query params
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ success: false, error: 'Event ID is required' }), { status: 400 });
    }

    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return new Response(JSON.stringify({ success: false, message: 'Event not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true, message: 'Event deleted' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 400 });
  }
}
