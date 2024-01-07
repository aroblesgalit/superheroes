export const GET = async (request, { params }) => {

  const apiKey = process.env.PIXABAY_API_KEY;

  let queryUrl = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(params.query)}&image_type=photo&safesearch=true&orientation=vertical`;

  try {
    const response = await fetch(queryUrl);
    if (!response) return new Response('Pixabay image not found', { status: 404 });

    const data = await response.json();
    const index = Math.floor(Math.random() * data.hits.length);
    return new Response(JSON.stringify(data.hits[index].webformatURL), { status: 200 });

  } catch (error) {
    return new Response('Failed to fetch from Pixabay', { status: 500 });
  }

}