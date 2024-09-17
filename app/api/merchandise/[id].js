import dbConnect from '../../lib/mongodb';
import Merchandise from "../../models/Merchandise";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    console.log("DB connected");

    // Extract id from params
    const { id } = params;
    console.log("Fetching product with ID:", id);

    // Find the merchandise with the provided ID using _id
    const merchandise = await Merchandise.findById(id);  // Using findById to fetch by _id
    console.log("Merchandise found:", merchandise);

    if (!merchandise) {
      console.log("Merchandise not found");
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(merchandise), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
