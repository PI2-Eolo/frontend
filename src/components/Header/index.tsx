import './index.css';
import logo from '../../assets/images/header_icon.png';

const Header = () => {
    return (
        <div className="header-container">
            <img src={logo} alt="Logo" />
            <h1> Painel de Dados e Controle </h1>
        </div>
    )
};

export default Header;