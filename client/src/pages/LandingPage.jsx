import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", background: "#f5f8ff", minHeight: "100vh" }}>
      {/* Hero Section */}
      <header style={{
        position: "relative",
        padding: "60px 0 120px",
        background: "linear-gradient(180deg, #c7f4f3 0%, #a8e8e6 50%, #f6fafd 100%)",
        overflow: "hidden",
        textAlign: "center"
      }}>
        <div style={{ marginBottom: "40px" }}>
          <h1 style={{
            display: "inline-block",
            fontSize: "2.5rem",
            fontWeight: 800,
            color: "#27364d",
            letterSpacing: "0.2em",
            textTransform: "uppercase"
          }}>
            Muris Art
          </h1>
        </div>

        <div style={{ margin: "0 auto 50px", maxWidth: "700px", display: "flex", justifyContent: "center" }}>
          <img
            src="/images/imgPrincipal.png"
            alt="Ilustración principal"
            style={{
              width: "100%",
              maxWidth: "600px",
              borderRadius: "40px",
              boxShadow: "0 30px 90px rgba(39, 54, 77, 0.18)",
              border: "8px solid rgba(255, 255, 255, 0.8)",
              objectFit: "cover"
            }}
          />
        </div>

        <nav style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          marginBottom: "30px",
          flexWrap: "wrap"
        }}>
          <a href="#work" style={{
            color: "#da4a91",
            fontSize: "1.2rem",
            fontWeight: 600,
            textDecoration: "none",
            padding: "8px 16px",
            borderRadius: "8px",
            transition: "all 0.3s ease",
            cursor: "pointer"
          }}>
            Mi trabajo
          </a>
          <a href="#about" style={{
            color: "#da4a91",
            fontSize: "1.2rem",
            fontWeight: 600,
            textDecoration: "none",
            padding: "8px 16px",
            borderRadius: "8px",
            transition: "all 0.3s ease",
            cursor: "pointer"
          }}>
            Sobre mí
          </a>
          <a href="#contact" style={{
            color: "#da4a91",
            fontSize: "1.2rem",
            fontWeight: 600,
            textDecoration: "none",
            padding: "8px 16px",
            borderRadius: "8px",
            transition: "all 0.3s ease",
            cursor: "pointer"
          }}>
            Contacto
          </a>
          <Link to="/admin" style={{
            background: "linear-gradient(135deg, #da4a91, #b83d78)",
            color: "#ffffff",
            fontSize: "1.2rem",
            fontWeight: 600,
            textDecoration: "none",
            padding: "8px 16px",
            borderRadius: "8px",
            transition: "all 0.3s ease",
            cursor: "pointer",
            border: "2px solid transparent",
            boxShadow: "0 4px 15px rgba(218, 74, 145, 0.3)"
          }}>
            Administrar
          </Link>
        </nav>

        <div style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "120px",
          background: "#f5f8ff",
          borderRadius: "50% 50% 0 0"
        }}></div>
      </header>

      {/* Work Section */}
      <main>
        <section id="work" style={{
          padding: "80px 0",
          maxWidth: "1100px",
          margin: "0 auto",
          paddingLeft: "32px",
          paddingRight: "32px"
        }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "36px"
          }}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px"
            }}>
              <span style={{
                display: "inline-block",
                color: "#da4a91",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontSize: "0.85rem"
              }}>
                Portafolio
              </span>
              <h2 style={{
                fontSize: "clamp(2rem, 3vw, 3rem)",
                lineHeight: "1.05",
                marginBottom: "18px"
              }}>
                Proyectos recientes
              </h2>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "24px"
            }}>
              {/* Cards would go here - simplified for now */}
              <div style={{
                background: "#ffffff",
                borderRadius: "32px",
                padding: "28px",
                boxShadow: "0 25px 60px rgba(39, 54, 77, 0.08)",
                display: "grid",
                gap: "18px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease"
              }}>
                <img src="/images/pla1.png" alt="Obra 1" style={{
                  borderRadius: "24px",
                  height: "220px",
                  objectFit: "cover",
                  maxWidth: "100%"
                }} />
                <h3 style={{ fontSize: "1.25rem", marginBottom: "8px" }}>Obra 1</h3>
                <p style={{ color: "#5d6f85", lineHeight: "1.75" }}>
                  Una pieza colorida con estilo moderno, ideal para publicaciones creativas.
                </p>
                <Link to="/obra/obra1" style={{
                  background: "#da4a91",
                  color: "#ffffff",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  display: "inline-block",
                  textAlign: "center",
                  transition: "all 0.3s ease"
                }}>
                  Ver más
                </Link>
              </div>

              <div style={{
                background: "#ffffff",
                borderRadius: "32px",
                padding: "28px",
                boxShadow: "0 25px 60px rgba(39, 54, 77, 0.08)",
                display: "grid",
                gap: "18px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease"
              }}>
                <img src="/images/pla2.png" alt="Obra 2" style={{
                  borderRadius: "24px",
                  height: "220px",
                  objectFit: "cover",
                  maxWidth: "100%"
                }} />
                <h3 style={{ fontSize: "1.25rem", marginBottom: "8px" }}>Obra 2</h3>
                <p style={{ color: "#5d6f85", lineHeight: "1.75" }}>
                  Ilustración vibrante pensada para destacar en redes sociales y contenido visual.
                </p>
                <Link to="/obra/obra2" style={{
                  background: "#da4a91",
                  color: "#ffffff",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  display: "inline-block",
                  textAlign: "center",
                  transition: "all 0.3s ease"
                }}>
                  Ver más
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}