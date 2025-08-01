from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import os

graph = ""

UPLOAD_DIRECTORY = "uploads_files"

os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)

file_path=""


app = FastAPI()

class QueryRequest(BaseModel):
    query: str

# Allow CORS so your frontend (localhost:3000) can talk to the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Change if frontend runs elsewhere
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    contents = await file.read()
    print("📥 Received file:", file.filename)
    print("📦 File size:", len(contents))

    # Define the path to save the file
    file_path = os.path.join(UPLOAD_DIRECTORY, file.filename)

    # Save the file to the server
    with open(file_path, "wb") as f:
        f.write(contents)

    # Run the engine script
    from engine import graph
    graph = graph

    # save or process file here
    return {"filename": file.filename, "size": len(contents)}

@app.post("/query")
async def handle_query(query: QueryRequest):
    print("Received query:", query)

    # Run Query
    response = graph.invoke(({"question": query}))
    print(response)
    
    return {"response": f"Received query: {query}"}

