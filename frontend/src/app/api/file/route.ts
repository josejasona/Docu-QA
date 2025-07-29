// src/app/api/ask/route.ts
export async function POST(req: Request) {
  const fileBlob = await req.blob();
  // You can forward this to your Python backend
  const form = new FormData();

  form.set("file", fileBlob, "document.pdf");

  const backendRes = await fetch("http://localhost:8000/upload", {
    method: "POST",
    body: form,
  });

  const result = await backendRes.json();

  return Response.json(result);
}
