import Superhero from "@models/superhero";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();

    const superheroes = await Superhero.find({});

    return new Response(JSON.stringify(superheroes), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch all superheroes', { status: 500 });
  }
}