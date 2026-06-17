import { useEffect, useState } from "react";
import AuthBar from "../components/AuthBar.jsx";
import ProductsSection from "../components/ProductsSection.jsx";
import { buildUrl } from "../api";

export default function Home() {
  const [productsKey, setProductsKey] = useState(0);

  useEffect(() => {
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.6s ease";
    const t = setTimeout(() => {
      document.body.style.opacity = "1";
    }, 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const hero = document.querySelector(".hero img");
    if (!hero) return undefined;
    function onScroll() {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      let opacity = 1 - scrollPosition / windowHeight;
      if (opacity < 0) opacity = 0;
      hero.style.opacity = String(opacity);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        const target = href && document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }, []);

  return (
    <>
      <section className="hero">
        <img src={buildUrl("/images/PORTADA.png")} alt="" />
      </section>

      <header className="header">
        <img className="bg" src={buildUrl("/images/bg.png")} alt="" />

        <div className="menu container">
          <a href="#" className="logo" aria-label="Inicio" />

          <input type="checkbox" id="menu" />
          <label htmlFor="menu">
            <img src={buildUrl("/images/menu.png")} className="menu-icono" alt="" />
          </label>

          <nav className="navbar">
            <ul>
              <AuthBar onProductsChanged={() => setProductsKey((k) => k + 1)} />
              <li>
                <a href="#">Inicio</a>
              </li>
              <li>
                <a href="#servicios">Servicios</a>
              </li>
              <li>
                <a href="#productos">Productos</a>
              </li>
              <li>
                <a href="#contacto">Contacto</a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="header-content container">
          <div className="header-txt">
            <span>Bienvenido</span>
            <h1>Disfruta de nuestro catalogo</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque cupiditate eveniet tenetur et, expedita
              excepturi. Repudiandae harum officia eveniet, quae nemo itaque! Quos sed eius aut nobis corporis itaque
              ducimus!
            </p>
            <a href="#servicios" className="btn-1">
              Informacion
            </a>
          </div>

          <div className="header-img">
            <img src={buildUrl("/images/pl-1.png")} alt="" />
          </div>
        </div>
      </header>

      <section id="servicios" className="brakefast container">
        <h2>Servicios</h2>

        <div className="breakfast-content">
          <div className="breakfast-1">
            <img src={buildUrl("/images/b1.png")} alt="" />
            <h3>Pintura 1</h3>
          </div>
          <div className="breakfast-1">
            <img src={buildUrl("/images/b2.png")} alt="" />
            <h3>Pintura 1</h3>
          </div>
          <div className="breakfast-1">
            <img src={buildUrl("/images/b3.png")} alt="" />
            <h3>Pintura 1</h3>
          </div>
          <div className="breakfast-1">
            <img src={buildUrl("/images/b4.jpeg")} alt="" />
            <h3>Pintura 1</h3>
          </div>
        </div>
      </section>

      <section className="info">
        <img className="bg-2" src={buildUrl("/images/bg-2.png")} alt="" />

        <div className="info-content">
          <div className="info-img">
            <img src={buildUrl("/images/breakfast.jpeg")} alt="" />
          </div>

          <div className="info-txt">
            <h2>la mejor calidad en los productos</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, voluptatem quaerat nam est maxime illo
              non voluptates, sapiente eligendi dolore alias veniam eius beatae architecto veritatis quasi dicta
              recusandae labore?
            </p>
            <a href="#productos" className="btn-1">
              Informacion
            </a>
          </div>
        </div>
      </section>

      <ProductsSection refreshKey={productsKey} />

      <footer id="contacto" className="footer">
        <div className="footer-content container">
          <div className="link">
            <h3>CONTACTAME</h3>
            <ul>
              <li>
                <a href="https://www.instagram.com/solecito_.30/" target="_blank" rel="noreferrer" className="btn btn-instagram">
                  Instagram
                </a>
              </li>
              <li>
                <a href="mailto:solanagranobles39@gmail.com" className="btn btn-email">
                  Correo Electronico
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
