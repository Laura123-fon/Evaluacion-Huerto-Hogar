import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="huertohogar-page">
      <main>

        {/* ========================== HERO ========================== */}
        <section className="hero">
          <div className="hero-content">
            <h1 id="heroTitle">BIENVENIDO A HUERTOHOGAR</h1>
            <p id="personalWelcome">¡Disfruta tu experiencia de compra!</p>
            <p id="heroSubtitle">
              Empieza tus compras con nosotros a partir de hoy.
            </p>

            <Link to="/catalog" className="btn btn-primary btn-large">
              Ir a Comprar
            </Link>
          </div>
        </section>

        {/* ==================== SOBRE HUERTOHOGAR ==================== */}
        <section className="contexto-section container">
          <h2>Sobre HuertoHogar</h2>

          <p>
            HuertoHogar es una tienda online dedicada a llevar la frescura y
            calidad de los productos del campo directamente a la puerta de
            nuestros clientes en Chile. Contamos con más de 6 años de
            experiencia en más de 9 puntos del país.
          </p>

          <p>
            Nuestro objetivo es conectar a las familias con el campo, promoviendo
            un estilo de vida saludable y sostenible.
          </p>
        </section>

        {/* ================== MISIÓN Y VISIÓN ================== */}
        <section className="mision-vision-section container">

          <article className="mision">
            <h3>🌿 Misión</h3>
            <p>
              Proporcionar productos frescos y de calidad directamente desde el
              campo, fomentando una conexión entre consumidores y agricultores
              locales.
            </p>
          </article>

          <article className="vision">
            <h3>🍃 Visión</h3>
            <p>
              Ser la tienda online líder en productos frescos en Chile,
              reconocida por calidad, servicio y compromiso con la
              sostenibilidad.
            </p>
          </article>

        </section>

        {/* ====================== TIENDAS + MAPA ====================== */}
        <section className="map-section">
          <h3>Encuéntranos en nuestras tiendas físicas</h3>

          <ul role="list">
            <li>Santiago</li>
            <li>Puerto Montt</li>
            <li>Villarrica</li>
            <li>Nacimiento</li>
            <li>Viña del Mar</li>
            <li>Valparaíso</li>
            <li>Concepción</li>
          </ul>

          <div id="huertoHogarMap">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.942022580017!2d-70.64826778480178!3d-33.456939980773606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c58f36e7a3cf%3A0x9e4e7cdbfc0d5ee5!2sSantiago%2C%20Chile!5e0!3m2!1ses!2scl!4v1715638833298!5m2!1ses!2scl"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa HuertoHogar"
            ></iframe>
          </div>
        </section>

        {/* ====================== MENSAJE FINAL ====================== */}
        <section className="mensaje-final container">
          <h3>🥑 ¡Descubre la frescura del campo con HuertoHogar!</h3>
          <p className="lead-text">
            Conéctate con la naturaleza y lleva lo mejor del campo a tu mesa.
            ¡Únete a nuestra comunidad!
          </p>
        </section>

      </main>
    </div>
  );
};

export default LandingPage;
