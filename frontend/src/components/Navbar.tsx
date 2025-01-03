import "../styles/navbar.css"; 
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [activeSection, setActiveSection] = useState<string>("home");
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); 
    const location = useLocation();
    const navigate = useNavigate();
  
    useEffect(() => {
      if (location.pathname === "/") {
        const observerOptions = {
          root: null,
          rootMargin: "0px",
          threshold: 0.8,
        };
  
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        }, observerOptions);
  
        const sections = document.querySelectorAll("section");
        sections.forEach((section) => observer.observe(section));
  
        return () => observer.disconnect();
      }
    }, [location.pathname]);
  
    const handleNavigateToSection = (section: string) => {
      if (location.pathname === "/") {
        const sectionElement = document.querySelector(`#${section}`);
        if (sectionElement) {
          sectionElement.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate(`/#${section}`);
        setTimeout(() => {
          const sectionElement = document.querySelector(`#${section}`);
          if (sectionElement) {
            sectionElement.scrollIntoView({ behavior: "smooth" });
          }
        }, 0);
      }
    };
  
    return (
      <>
      <nav className="navbar">
        <div className="logo-container">
          <img src="./Frame443.png" alt="Logo" className="logoimg" />
          <div className="logo">DealFinder</div>
        </div>
  
        
        <div
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </div>
        <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <a
            href="#home"
            onClick={() => handleNavigateToSection("home")}
            className={activeSection === "home" ? "active" : ""}
          >
            Home
          </a>
          <a
            href="#features"
            onClick={() => handleNavigateToSection("features")}
            className={activeSection === "features" ? "active" : ""}
          >
            Features
          </a>
          <a
            href="#faq"
            onClick={() => handleNavigateToSection("faq")}
            className={activeSection === "faq" ? "active" : ""}
          >
            FAQ
          </a>
          <a
            href="#contact"
            onClick={() => handleNavigateToSection("contact")}
            className={activeSection === "contact" ? "active" : ""}
          >
            Contact
          </a>
          <Link to="/deals" className="nav-link">Deals</Link>
        </div>
      </nav>
      
      </>
    );
  };

export default Navbar;