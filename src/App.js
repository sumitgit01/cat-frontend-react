import React, { useEffect, useState } from "react";

function App() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://192.168.68.113:8123/api/cats/getcats")
      .then((response) => response.json())
      .then((data) => {
        setCats(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cats:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ffecd2, #fcb69f)",
        padding: "30px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "40px",
          fontWeight: "bold",
          marginBottom: "30px",
          color: "#3A3A3A",
        }}
      >
        🐱 Cat Adoption Center
      </h1>

      {loading ? (
        <p style={{ textAlign: "center", fontSize: "20px" }}>Loading cats...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "25px",
          }}
        >
          {cats.map((cat) => (
            <div
              key={cat.id}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "15px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                textAlign: "center",
                transition: "0.3s",
              }}
            >
              <img
                src={cat.imageUrl}
                alt={cat.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginBottom: "15px",
                }}
              />
              <h2 style={{ fontSize: "24px", marginBottom: "5px" }}>
                {cat.name}
              </h2>
              <p style={{ margin: "5px 0" }}>🐾 Breed: {cat.breed}</p>
              <p style={{ margin: "5px 0" }}>🎂 Age: {cat.age} years</p>
              <p style={{ margin: "10px 0", fontWeight: "bold" }}>
                {cat.available ? "✅ Available" : "❌ Not Available"}
              </p>

              {cat.videoUrl && (
                <a
                  href={cat.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    marginBottom: "15px",
                    color: "#007bff",
                    textDecoration: "underline",
                  }}
                >
                  🎥 Watch Video
                </a>
              )}

              <button
                style={{
                  background: cat.available ? "#28a745" : "#999",
                  border: "none",
                  color: "white",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  cursor: cat.available ? "pointer" : "not-allowed",
                  fontSize: "16px",
                }}
                disabled={!cat.available}
              >
                Adopt Me 🐈
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
