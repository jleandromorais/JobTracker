import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faChartLine, faBriefcase, faChartBar, faBars } from '@fortawesome/free-solid-svg-icons';
// Você precisaria de um arquivo CSS para estilizar isso ou inline styles como no dashboard
// import styles from '../style/Navbar.module.css'; // Exemplo de CSS Module

const Navbar = ({ onAddJobClick, activePage, onNavigate }) => {
  // Funções de estilo inline (para demonstração, considere usar CSS Modules)
  const navbarStyles = {
    backgroundColor: '#ffffff',
    padding: '15px 30px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky', // ou 'fixed' se quiser fixar no topo
    top: 0,
    zIndex: 999,
  };

  const logoStyles = {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#4361ee', // primary color
  };

  const navLinksStyles = {
    display: 'flex',
    gap: '25px',
  };

  const navLinkItemStyles = {
    textDecoration: 'none',
    color: '#6c757d', // gray-600
    fontSize: '1rem',
    fontWeight: '500',
    padding: '5px 0',
    transition: 'color 0.3s ease',
    ':hover': { // Não funciona diretamente com inline styles
      color: '#4361ee',
    },
  };

  const activeLinkStyles = {
    color: '#4361ee', // primary color for active link
    borderBottom: '2px solid #4361ee',
  };

  const btnAddJobStyles = {
    backgroundColor: '#4361ee',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '500',
    transition: 'background-color 0.3s ease',
  };

  // Lógica de responsividade (simplificada, em CSS seria com media queries)
  const isMobile = window.innerWidth < 768; // Exemplo simples

  return (
    <nav style={navbarStyles}>
      <div style={logoStyles}>JobTracker</div>

      {/* Menu para Desktop */}
      {!isMobile && (
        <div style={navLinksStyles}>
          <a
            href="#"
            style={{ ...navLinkItemStyles, ...(activePage === 'dashboard' && activeLinkStyles) }}
            onClick={() => onNavigate('dashboard')}
          >
            <FontAwesomeIcon icon={faChartLine} style={{ marginRight: '8px' }} /> Dashboard
          </a>
          <a
            href="#"
            style={{ ...navLinkItemStyles, ...(activePage === 'add-job' && activeLinkStyles) }}
            onClick={() => onNavigate('add-job')}
          >
            <FontAwesomeIcon icon={faBriefcase} style={{ marginRight: '8px' }} /> Adicionar Vaga
          </a>
          <a
            href="#"
            style={{ ...navLinkItemStyles, ...(activePage === 'charts' && activeLinkStyles) }}
            onClick={() => onNavigate('charts')}
          >
            <FontAwesomeIcon icon={faChartBar} style={{ marginRight: '8px' }} /> Gráficos
          </a>
        </div>
      )}

      {/* Botão Adicionar Vaga */}
      <button style={btnAddJobStyles} onClick={onAddJobClick}>
        <FontAwesomeIcon icon={faPlus} /> {!isMobile && "Adicionar Vaga"}
      </button>

      {/* Menu Hambúrguer para Mobile (simplificado) */}
      {isMobile && (
        <button style={{ background: 'none', border: 'none', fontSize: '1.5rem', color: '#333', cursor: 'pointer' }}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        // Aqui você implementaria a lógica para um menu lateral ou dropdown
      )}
    </nav>
  );
};

export default Navbar;