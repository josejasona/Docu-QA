// src/app/api/query/route.ts
export async function POST(req: Request) {
  const { query } = await req.json();

  const backendRes = await fetch("http://localhost:8000/query", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const result = await backendRes.json();

  return Response.json(result);
}
