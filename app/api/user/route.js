import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();

    const userId = await request.json();
    const userData = await User.find({ _id: userId });
    
    return new Response(JSON.stringify(userData), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch user data', { status: 500});
  }
}