// frontend/pages/api/mistral.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const url = 'https://ai-bio-gen-backend.onrender.com/handler';

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      return res.status(response.status).json({ message: 'Error forwarding request' });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error: any) {
    console.error('Error at JS Route File:', error.message);
    res.status(500).json({ message: 'Error at JS Route File', error: error.message });
  }
};

export default handler;
