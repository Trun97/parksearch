import './Header.css';

function Header({ image, title }) {
    return (
        <section className="header">
            <img src={image} alt={title} className="header-image" />
            <h1>{title}</h1>
        </section>
    );
}

export default Header;