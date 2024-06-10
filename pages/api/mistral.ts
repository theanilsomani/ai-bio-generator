// frontend/pages/api/mistral.ts
export default async (req: any, res: any) => {
  const url = 'https://ai-bio-gen-backend.vercel.app/handler'; // Flask backend URL

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body), // Make sure to stringify the body
    });

    // Check if the response from Flask was not OK (i.e., status code outside of 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Error forwarding request at JS Route File:', error);
    res.status(500).json({ message: 'Error forwarding request at JS Route File', error: error.message });
  }
};
