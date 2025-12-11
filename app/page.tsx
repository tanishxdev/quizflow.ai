export default function Home() {
  return (
    <main
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
      }}
    >
      <h1>quizflow.ai</h1>
      <h3>Deployment Test Page</h3>

      <p style={{ marginTop: "20px", fontSize: "12px", color: "#555" }}>
        Next.js app running successfully.
      </p>
    </main>
  );
}
