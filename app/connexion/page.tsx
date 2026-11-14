
"use client";

import { useState } from "react";

export default function Connexion() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/connexion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Mot de passe incorrect.");
        return;
      }

      window.location.href = "/admin";
    } catch {
      setMessage("Erreur de connexion. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#14243a",
      padding: "20px"
    }}>
      <form onSubmit={handleLogin} style={{
        background: "white",
        padding: "30px",
        borderRadius: "14px",
        width: "100%",
        maxWidth: "400px"
      }}>
        <h1 style={{ textAlign: "center" }}>DREY TRACKA</h1>
        <h2 style={{ textAlign: "center" }}>Connexion administrateur</h2>

        <label>Mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Entrez votre mot de passe"
          style={{
            width: "100%",
            padding: "13px",
            marginTop: "10px",
            marginBottom: "15px",
            boxSizing: "border-box"
          }}
        />

        <button type="submit" disabled={loading} style={{
          width: "100%",
          padding: "14px",
          background: "#e5a93e",
          border: "none",
          borderRadius: "8px",
          fontWeight: "bold"
        }}>
          {loading ? "Connexion..." : "Se connecter"}
        </button>

        {message && <p>{message}</p>}
      </form>
    </main>
  );
}
