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

export const POST = async (request) => {
  const { id, name, image, appearance, biography, powerstats, connections, work, battlestats } = await request.json();

  try {
    await connectToDB();
    const newSuperhero = new Superhero({ id, name, image, appearance, biography, powerstats, connections, work, battlestats });

    await newSuperhero.save();
    return new Response(JSON.stringify(newSuperhero), { status: 201 });
  } catch (error) {
    return new Response('Failed to add superhero to database', { status: 500 });
  }
}