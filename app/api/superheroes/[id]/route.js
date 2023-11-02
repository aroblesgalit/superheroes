import Superhero from "@models/superhero";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const superhero = await Superhero.find({ id: params.id });
    if (!superhero) return new Response('Superhero not found', { status: 404 });

    return new Response(JSON.stringify(superhero), { status: 200 });
  } catch (error) {
    return new Response('Internal server error', { status: 500 });
  }
}