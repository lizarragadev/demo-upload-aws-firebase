import { useState } from "react"
import { db } from "./firebase"
import { addDoc, collection } from "firebase/firestore"

function App() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleUpload() {
    if (!file) return

    try {
      setLoading(true)

      const presignResponse = await fetch("/api/presign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileType: file.type,
        }),
      })

      const { uploadUrl, imageUrl } = await presignResponse.json()

      await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      })

      await addDoc(collection(db, "images"), {
        imageUrl,
        createdAt: new Date(),
      })

      alert("Imagen subida correctamente")
    } catch (error) {
      console.error(error)
      alert("Error uploading image")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Upload seguro a S3</h1>

      <input
        type="file"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            setFile(e.target.files[0])
          }
        }}
      />

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Subiendo..." : "Subir imagen"}
      </button>
    </div>
  )
}

export default App
