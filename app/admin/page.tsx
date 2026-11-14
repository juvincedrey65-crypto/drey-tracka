
"use client";

import { useState } from "react";

export default function AdminPage() {
  const [tracking, setTracking] = useState("");
  const [client, setClient] = useState("");
  const [status, setStatus] = useState("Colis reçu en Chine");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [trackingUpdate, setTrackingUpdate] = useState("");
  const [newStatus, setNewStatus] = useState("Colis en préparation");
  const [updateMessage, setUpdateMessage] = useState("");
  const [updating, setUpdating] = useState(false);

  async function addPackage() {
    if (!tracking.trim() || !client.trim()) {
      setMessage("Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tracking, client, status }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Erreur d'enregistrement.");
        return;
      }

      setMessage("Colis enregistré avec succès !");
      setTracking("");
      setClient("");
      setStatus("Colis reçu en Chine");
    } catch {
      setMessage("Erreur de connexion. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      await fetch("/api/deconnexion", {
        method: "POST",
      });
    } finally {
      window.location.href = "/connexion";
    }
  }

  async function updatePackageStatus() {
    if (!trackingUpdate.trim()) {
      setUpdateMessage("Veuillez entrer le numéro de suivi.");
      return;
    }

    setUpdating(true);

    try {
      const response = await fetch("/api/admin", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tracking: trackingUpdate,
          status: newStatus,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setUpdateMessage(data.error || "Erreur de modification.");
        return;
      }

      setUpdateMessage("Statut modifié avec succès !");
    } catch {
      setUpdateMessage("Erreur de connexion. Réessayez.");
    } finally {
      setUpdating(false);
    }
  }

  const inputStyle = {
    display: "block",
    width: "100%",
    boxSizing: "border-box" as const,
    padding: "13px",
    margin: "10px 0 20px",
    border: "1px solid #cbd5e1",
    borderRadius: "7px",
    fontSize: "15px",
  };

  return (
    <main
      style={{
        background: "#f4f6f9",
        color: "#14243a",
        padding: "30px",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "750px", margin: "auto" }}>

        <button
          onClick={logout}
          style={{
            background: "#d9534f",
            color: "white",
            padding: "10px 18px",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          Déconnexion
        </button>

        <h1>DREY TRACKA</h1>
        <p>Espace administrateur</p>

        <section
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "14px",
            marginTop: "30px",
          }}
        >
          <h2>Enregistrer un nouveau colis</h2>

          <label>Numéro de suivi</label>
          <input
            value={tracking}
            onChange={(e) => setTracking(e.target.value)}
            placeholder="Ex : DRT-2026-002"
            style={inputStyle}
          />

          <label>Nom du client</label>
          <input
            value={client}
            onChange={(e) => setClient(e.target.value)}
            placeholder="Nom du client"
            style={inputStyle}
          />

          <label>Statut du colis</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={inputStyle}
          >
            <option>Colis reçu en Chine</option>
            <option>Colis en préparation</option>
            <option>Expédié de Chine</option>
            <option>En transit</option>
            <option>Arrivé en RDC</option>
            <option>Disponible pour le retrait à Lubumbashi</option>
            <option>Livré au client</option>
          </select>

          <button
            onClick={addPackage}
            disabled={loading}
            style={{
              width: "100%",
              padding: "15px",
              background: "#e5a93e",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {loading ? "Enregistrement…" : "Enregistrer le colis"}
          </button>

          {message && <p style={{ marginTop: 15 }}>{message}</p>}
        </section>

        <section
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "14px",
            marginTop: "30px",
          }}
        >
          <h2>Modifier le statut d'un colis</h2>

          <label>Numéro de suivi</label>
          <input
            value={trackingUpdate}
            onChange={(e) => setTrackingUpdate(e.target.value)}
            placeholder="Ex : DRT-2026-002"
            style={inputStyle}
          />

          <label>Nouveau statut</label>
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            style={inputStyle}
          >
            <option>Colis reçu en Chine</option>
            <option>Colis en préparation</option>
            <option>Expédié de Chine</option>
            <option>En transit</option>
            <option>Arrivé en RDC</option>
            <option>Disponible pour le retrait à Lubumbashi</option>
            <option>Livré au client</option>
          </select>

          <button
            onClick={updatePackageStatus}
            disabled={updating}
            style={{
              width: "100%",
              padding: "15px",
              background: "#14243a",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {updating ? "Modification…" : "Modifier le statut"}
          </button>

          {updateMessage && (
            <p style={{ marginTop: 15 }}>{updateMessage}</p>
          )}
        </section>

      </div>
    </main>
  );
}
