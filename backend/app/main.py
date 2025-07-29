from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel


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

    # save or process file here
    return {"filename": file.filename, "size": len(contents)}

@app.post("/query")
async def handle_query(query: QueryRequest):
    print("Received query:", query)
    return {"response": f"Received query: {query}"}
