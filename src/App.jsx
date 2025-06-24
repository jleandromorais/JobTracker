import React, { useState } from 'react';
import JobDashboard from './components/dashboard.jsx';
import JobGrafico from './components/graficos.jsx'; // O componente de gráficos
import JobApplicationForm from './components/Pg.jsx'; // O componente do formulário
import Navbar from './components/NavBar.jsx'; // O novo componente Navbar

function App() {
  const [activePage, setActivePage] = useState('dashboard'); // Estado para controlar a página ativa
  const [isFormModalOpen, setIsFormModalOpen] = useState(false); // Para abrir o formulário como modal

  const handleNavigate = (page) => {
    setActivePage(page);
    if (page === 'add-job') {
      setIsFormModalOpen(true); // Abrir o formulário como modal se for a página "Adicionar Vaga"
    } else {
      setIsFormModalOpen(false); // Fechar o modal se mudar para outra página
    }
  };

  const handleAddJobClick = () => {
    setIsFormModalOpen(true);
    setActivePage('add-job'); // Opcional: marcar "Adicionar Vaga" como ativa na Navbar
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setActivePage('dashboard'); // Voltar para o dashboard após fechar
  };

  return (
    <>
      <Navbar
        onAddJobClick={handleAddJobClick}
        activePage={activePage}
        onNavigate={handleNavigate}
      />

      {/* Conteúdo Principal baseado na página ativa */}
      {activePage === 'dashboard' && <JobDashboard />}
      {activePage === 'charts' &&  <JobGrafico/>}
      

      {/* Renderiza o formulário como um modal se isFormModalOpen for true */}
      {isFormModalOpen && (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '8px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
                maxWidth: '700px',
                width: '90%',
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative'
            }}>
                <button
                    onClick={handleCloseFormModal}
                    style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        color: '#6c757d'
                    }}
                >
                   &times; {/* Caractere 'X' para fechar */}
                </button>
                <JobApplicationForm onSave={handleCloseFormModal} onCancel={handleCloseFormModal} />
            </div>
        </div>
      )}
    </>
  );
}

export default App;