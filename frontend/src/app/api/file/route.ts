// src/app/api/ask/route.ts
export async function POST(req: Request) {
  // Get the file from the request (as Blob)
  const fileBlob = await req.blob();

  // Create a FormData object to send the file to the backend
  const form = new FormData();

  // If the file was sent with a name in the headers, use that
  // In the case of receiving a Blob, we can create a default file name
  const fileName = "uploaded_file.pdf"; // Fallback name if fileBlob doesn't have a name

  // Set the file in the FormData
  form.set("file", fileBlob, fileName); // Set fileBlob with a name for the backend

  // Send the file to the backend
  const backendRes = await fetch("http://localhost:8000/upload", {
    method: "POST",
    body: form,
  });

  // Get the response from the backend
  const result = await backendRes.json();

  // Return the backend response
  return Response.json(result);
}
