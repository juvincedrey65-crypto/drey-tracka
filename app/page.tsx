
"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

const trackingSteps = [
  "Colis reçu en Chine",
  "Colis en préparation",
  "Expédié de Chine",
  "En transit",
  "Arrivé en RDC",
  "Disponible pour le retrait à Lubumbashi",
];

type Colis = {
  numero_suivi: string;
  statut: string;
  origine: string;
  destination: string;
  derniere_mise_a_jour: string;
};

export default function Home() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [colis, setColis] = useState<Colis | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleTracking() {
    if (!trackingNumber.trim()) {
      setError("Veuillez entrer votre numéro de suivi.");
      setColis(null);
      return;
    }

    setLoading(true);
    setError("");
    setColis(null);

    try {
      const response = await fetch(
        `/api/tracking?numero=${encodeURIComponent(
          trackingNumber.trim()
        )}`,
        { cache: "no-store" }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Impossible de retrouver ce colis.");
        return;
      }

      setColis(data.colis);
    } catch {
      setError("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  const currentStep = colis
    ? trackingSteps.indexOf(colis.statut)
    : -1;

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Image
          src="/drey-tracka-logo.svg"
          alt="Logo DREY TRACKA"
          width={260}
          height={100}
          priority
        />
        <p>Votre colis, notre priorité.</p>
      </header>

      <section className={styles.hero}>
        <p className={styles.tag}>CHINE 🇨🇳 → RDC 🇨🇩</p>

        <h2>
          Suivez vos colis
          <br />
          en toute confiance.
        </h2>

        <p className={styles.description}>
          Gardez le contrôle de vos marchandises,
          de leur départ en Chine jusqu'à leur arrivée
          en République démocratique du Congo.
        </p>

        <div className={styles.tracking}>
          <h3>Suivre mon colis</h3>

          <input
            type="text"
            placeholder="Entrez votre numéro de suivi"
            value={trackingNumber}
            onChange={(e) => {
              setTrackingNumber(e.target.value);
              setColis(null);
              setError("");
            }}
          />

          <button onClick={handleTracking} disabled={loading}>
            {loading ? "Recherche en cours..." : "Rechercher mon colis"}
          </button>

          {error && (
            <p style={{ color: "red", marginTop: 15 }}>{error}</p>
          )}

          {colis && (
            <div style={{ textAlign: "left", marginTop: 25 }}>
              <h3>Informations sur votre colis</h3>

              <p>
                Numéro : <strong>{colis.numero_suivi}</strong>
              </p>

              <p>
                Origine : <strong>{colis.origine}</strong>
              </p>

              <p>
                Destination : <strong>{colis.destination}</strong>
              </p>

              <p style={{ marginTop: 15 }}>
                Statut actuel :
              </p>

              <p style={{ color: "#b38325", fontWeight: "bold" }}>
                {colis.statut}
              </p>

              <p style={{ fontSize: 13, marginTop: 10 }}>
                Dernière mise à jour :{" "}
                {new Date(colis.derniere_mise_a_jour).toLocaleString("fr-FR")}
              </p>

              <h3 style={{ marginTop: 25 }}>Progression du colis</h3>

              {currentStep >= 0 ? (
                trackingSteps.map((step, index) => (
                  <div
                    key={step}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 18,
                    }}
                  >
                    <span
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        background:
                          index <= currentStep ? "#d5a343" : "#e5eaf0",
                        color: "#10243b",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        flexShrink: 0,
                      }}
                    >
                      {index + 1}
                    </span>
                    <span
                      style={{
                        fontWeight:
                          index === currentStep ? "bold" : "normal",
                      }}
                    >
                      {step}
                    </span>
                  </div>
                ))
              ) : (
                <p>
                  Votre colis est actuellement à l'étape :
                  {" "}{colis.statut}
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      <section className={styles.services}>
        <h2>Pourquoi choisir DREY TRACKA ?</h2>

        <div className={styles.service}>
          <h3>📦 Suivi des colis</h3>
          <p>Consultez les informations de votre expédition.</p>
        </div>

        <div className={styles.service}>
          <h3>🌍 Transport international</h3>
          <p>De la Chine jusqu'en RDC.</p>
        </div>

        <div className={styles.service}>
          <h3>🤝 Confiance et transparence</h3>
          <p>Restez informé à chaque étape du transport.</p>
        </div>
      </section>

      
      <section style={{
        textAlign: "center",
        padding: "30px 20px",
        marginTop: "20px",
      }}>
        <h2>Besoin d'aide ?</h2>
        <p style={{ margin: "12px 0 20px" }}>
          Notre équipe est disponible pour répondre à vos questions.
        </p>

        <a
          href="https://wa.me/243842656805?text=Bonjour%20DREY%20TRACKA%2C%20je%20souhaite%20avoir%20des%20informations%20sur%20mon%20colis."
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            background: "#25D366",
            color: "white",
            padding: "14px 24px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Contacter DREY TRACKA sur WhatsApp
        </a>
      </section>

      <footer className={styles.footer}>
        © 2026 DREY TRACKA - Tous droits réservés.
      </footer>

    </main>
  );
}
