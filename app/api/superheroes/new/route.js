import Superhero from "@models/superhero";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const { id, name, image, appearance, biography, powerstats, connections, work } = await request.json();

  try {
    await connectToDB();
    const newSuperhero = new Superhero({ id, name, image, appearance, biography, powerstats, connections, work });

    await newSuperhero.save();
    return new Response(JSON.stringify(newSuperhero), { status: 201 });
  } catch (error) {
    return new Response('Failed to add superhero to database', { status: 500 });
  }
}