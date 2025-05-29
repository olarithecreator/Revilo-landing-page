const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  try {
    const imageUrl = event.queryStringParameters.url;

    if (!imageUrl) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Image URL is required' })
      };
    }

    const response = await fetch(imageUrl);

    if (!response.ok) {
      // Handle non-successful HTTP responses from the external image URL
      return {
        statusCode: response.status,
        body: response.statusText
      };
    }

    // Get the image data as a buffer
    const imageBuffer = await response.buffer();

    // Determine the content type from the response headers
    const contentType = response.headers.get('content-type') || 'image/jpeg'; // Default to jpeg if not specified

    return {
      statusCode: 200,
      headers: {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*' // This is crucial for CORS
      },
      body: imageBuffer.toString('base64'), // Return as base64 string
      isBase64Encoded: true,
    };

  } catch (error) {
    console.error('Image proxy error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to proxy image', details: error.message })
    };
  }
}; 