export const runtime = "edge";

const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

const API_URL = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/mistral/mistral-7b-instruct-v0.1`;

export default async function handler(request: any) {
  if (!request.body) {
    return new Response(JSON.stringify({ message: "Missing request body" }), {
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      status: 400,
    });
  }

  const { prompt } = await request.json();

  const messages = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: prompt },
  ];

  try {
    const cloudflareResponse = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
      },
      body: JSON.stringify({ messages, stream: false }),
    });

    if (!cloudflareResponse.ok) {
      const errorText = await cloudflareResponse.text();
      return new Response(JSON.stringify({ message: errorText }), {
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        status: cloudflareResponse.status,
      });
    }

    const jsonResponse = await cloudflareResponse.json();

    return new Response(JSON.stringify({ bio: jsonResponse.result.response }), {
      headers: new Headers({
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      }),
      status: 200,
    });

  } catch (error) {
    return new Response(JSON.stringify({ message: "Error generating bio" }), {
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      status: 500,
    });
  }
}

