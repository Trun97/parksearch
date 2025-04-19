import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-links">
                <Link to="/privacy">Privacy Notice</Link>
                <Link to="/terms">Terms & Conditions</Link>
                <Link to="/contact">Contact</Link>
            </div>
        </footer>
    );
}

export default Footer;
