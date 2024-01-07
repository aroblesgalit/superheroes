export const GET = async (request, { params }) => {

  const apiKey = process.env.PEXELS_API_KEY;

  let queryUrl = `https://api.pexels.com/v1/search?query=${params.query}`;

  try {
    const response = await fetch(queryUrl, {
      headers: {
        Authorization: apiKey
      }
    });
    if (!response) return new Response('Pexels image not found', { status: 404 });

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });

  } catch (error) {
    return new Response('Failed to fetch from Pexels', { status: 500 });
  }

}