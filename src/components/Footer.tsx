import '../styles/Footer.css';

interface FooterProps 
{
  isFixed: boolean;
}

export const Footer = ({ isFixed }:FooterProps) => {
  return (
    <footer className={`footer text-dark border-top border-secondary-subtle py-4 ${isFixed ? 'fixed' : ''}`}>
      <div className="container">
        <div className="row text-center">
          <div className="col-md-6 col-lg-6 col-xl-6">
            <h5>Información de Contacto</h5>
            <p>Dirección: 123 Calle Principal, Mérida, Yucatán</p>
            <p>Teléfono: +123 456 789</p>
            <p>Correo electrónico: info@example.com</p>
          </div>
          <div className="col-md-6 col-lg-6 col-xl-6">
            <h5>Síguenos en las redes sociales</h5>
            <ul className="list-unstyled">
              <li><a href="#"><i className="fab fa-facebook"></i> Facebook</a></li>
              <li><a href="#"><i className="fab fa-twitter"></i> Twitter</a></li>
              <li><a href="#"><i className="fab fa-instagram"></i> Instagram</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};