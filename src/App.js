import React, { useEffect, useState } from "react";

function App() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://catservice.seh.buzz/api/cats/getcats")
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
    <div style={{ minHeight: "100vh", background: "#f7f7f7", padding: "20px" }}>
      <h1
        style={{ textAlign: "center", fontSize: "28px", marginBottom: "20px" }}
      >
        ��� Cat List
      </h1>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading cats...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {cats.map((cat) => (
            <div
              key={cat.id}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <h2 style={{ marginBottom: "10px" }}>{cat.name}</h2>
              <p>Breed: {cat.breed}</p>
              <p>Age: {cat.age}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
