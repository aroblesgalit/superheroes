export const GET = async (request, { params }) => {
  
  const accessToken = process.env.SH_ACCESS_TOKEN;

  let queryUrl = `https://superheroapi.com/api/${accessToken}/search/${params.query}`;
  console.log('query: ', params.query)

  try {
    const response = await fetch(queryUrl);
    if (!response) return new Response('Superhero not found', { status: 404 });

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });

  } catch (error) {
    return new Response('Failed to fetch superheroes', { status: 500 });
  }
}