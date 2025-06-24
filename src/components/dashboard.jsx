// src/components/dashboard.jsx (JobDashboard)

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDay,
  faCalendarWeek,
  faCalendarAlt,
  faBriefcase,
  faPlus,
  faSearch,
  faEye,
  faEdit,
  faTrash,
  faChevronRight,
  faTimesCircle // Para o ícone de fechar modal/form
} from '@fortawesome/free-solid-svg-icons';

// Importe o componente JobApplicationForm
import JobApplicationForm from './Pg.jsx'; // Certifique-se de que o caminho está correto

// Define suas cores base diretamente aqui
const colors = {
  primary: '#4361ee',
  secondary: '#3f37c9',
  success: '#4caf50',
  warning: '#ff9800',
  danger: '#f44336',
  info: '#2196f3',
  blue: '#4361ee',
  green: '#4caf50',
  orange: '#ff9800',
  purple: '#7209b7',
  gray100: '#f8f9fa',
  gray200: '#e9ecef',
  gray300: '#dee2e6',
  gray400: '#ced4da',
  gray500: '#adb5bd',
  gray600: '#6c757d',
  gray700: '#495057',
  gray800: '#343a40',
  gray900: '#212529',
};

const dashboardStyles = {
  display: 'flex',
  minHeight: '100vh',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  backgroundColor: '#f5f7fb',
  color: colors.gray800,
  lineHeight: '1.6',
};

const mainContentStyles = {
  flex: 1,
  padding: '20px',
  overflowY: 'auto',
};

const contentHeaderStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '30px',
};

const headerTitleStyles = {
  h2: {
    fontSize: '1.8rem',
    color: colors.gray800,
    marginBottom: '5px',
  },
  p: {
    color: colors.gray600,
  },
};

const btnPrimaryStyles = {
  backgroundColor: colors.primary,
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '8px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontWeight: '500',
  transition: 'background-color 0.3s ease', // Adicionando transição
  // O hover real precisaria de CSS ou uma biblioteca.
  // Para fins de demonstração, o estilo base será aplicado.
};

const statsCardsStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: '20px',
  marginBottom: '30px',
};

const cardStyles = {
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  padding: '20px',
  display: 'flex',
  alignItems: 'center',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  // Hover effect would typically be in a CSS file
};

const cardIconStyles = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '15px',
  color: 'white',
  blue: { backgroundColor: colors.blue },
  green: { backgroundColor: colors.green },
  orange: { backgroundColor: colors.orange },
  purple: { backgroundColor: colors.purple },
  icon: { fontSize: '1.5rem' },
};

const cardInfoStyles = {
  h3: {
    fontSize: '0.9rem',
    color: colors.gray600,
    marginBottom: '5px',
    fontWeight: '500',
  },
  cardNumber: {
    fontSize: '1.8rem',
    fontWeight: '600',
    color: colors.gray800,
  },
};

const jobsTableSectionStyles = {
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  padding: '20px',
};

const tableHeaderStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
};

const tableActionsStyles = {
  display: 'flex',
  gap: '15px',
};

const filterDropdownStyles = {
  select: {
    padding: '8px 12px',
    border: `1px solid ${colors.gray300}`,
    borderRadius: '8px',
    backgroundColor: 'white',
    color: colors.gray700,
    cursor: 'pointer',
  },
};

const searchBoxStyles = {
  position: 'relative',
  input: {
    padding: '8px 12px',
    paddingRight: '35px',
    border: `1px solid ${colors.gray300}`,
    borderRadius: '8px',
    width: '200px',
  },
  icon: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: colors.gray500,
  },
};

const tableContainerStyles = {
  overflowX: 'auto',
};

const jobsTableStyles = {
  width: '100%',
  borderCollapse: 'collapse',
  th: {
    backgroundColor: colors.gray200,
    color: colors.gray800,
    padding: '12px',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: '0.9rem',
  },
  td: {
    padding: '12px',
    borderBottom: `1px solid ${colors.gray300}`,
    fontSize: '0.9rem',
  },
  // trHover: { // This will not work with inline styles
  //   ':hover': {
  //     backgroundColor: 'rgba(67, 97, 238, 0.05)',
  //   },
  // },
  thFirst: { width: '40%' },
  tdFirst: { width: '40%' },
  thLast: { width: '20%' },
  tdLast: { width: '20%' },
  status: {
    padding: '5px 10px',
    borderRadius: '8px',
    fontSize: '0.8rem',
    fontWeight: '500',
    color: 'white',
    pending: { backgroundColor: colors.warning },
    approved: { backgroundColor: colors.success },
    rejected: { backgroundColor: colors.danger },
  },
  actions: {
    display: 'flex',
    gap: '10px',
  },
};

const btnIconStyles = {
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  color: colors.gray600,
  transition: 'color 0.3s ease',
  // ':hover': { // This will not work with inline styles
  //   color: colors.primary,
  // },
  icon: {
    fontSize: '1.1rem',
  },
};

const paginationStyles = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px',
  pageBtn: {
    backgroundColor: 'white',
    border: `1px solid ${colors.gray300}`,
    padding: '8px 12px',
    borderRadius: '8px',
    margin: '0 5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease',
    notActive: { color: colors.gray600 },
    active: {
      backgroundColor: colors.primary,
      color: 'white',
      borderColor: colors.primary,
    },
    // ':hover': { // This will not work with inline styles
    //   backgroundColor: colors.secondary,
    //   color: 'white',
    // },
    icon: { fontSize: '0.9rem' },
  },
};

// ====================================================================
// NEW STYLES FOR MODAL / OVERLAY
// ====================================================================
const modalOverlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContentStyles = {
  backgroundColor: 'white',
  padding: '30px',
  borderRadius: '8px',
  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
  maxWidth: '600px',
  width: '90%',
  position: 'relative',
  maxHeight: '80vh',
  overflowY: 'auto',
};

const modalCloseButtonStyles = {
  position: 'absolute',
  top: '15px',
  right: '15px',
  backgroundColor: 'transparent',
  border: 'none',
  fontSize: '1.5rem',
  cursor: 'pointer',
  color: colors.gray600,
};

const jobDetailsStyles = {
  h3: {
    fontSize: '1.8rem',
    marginBottom: '15px',
    color: colors.primary,
    textAlign: 'center',
  },
  p: {
    marginBottom: '10px',
    fontSize: '1rem',
    color: colors.gray700,
  },
  label: {
    fontWeight: 'bold',
    color: colors.gray800,
    marginRight: '5px',
  }
};


const JobDashboard = () => {
  const [jobListings, setJobListings] = useState(() => {
    try {
      const savedJobs = localStorage.getItem('jobApplicationsList');
      return savedJobs ? JSON.parse(savedJobs) : [];
    } catch (error) {
      console.error("Failed to load job listings from localStorage:", error);
      return [];
    }
  });

  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  // New state for modal/form visibility and selected job
  const [selectedJob, setSelectedJob] = useState(null); // Holds the job object for view/edit
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls view modal visibility
  const [isFormOpen, setIsFormOpen] = useState(false);   // Controls edit/add form visibility

  // Effect to listen for localStorage updates
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const updatedJobs = JSON.parse(localStorage.getItem('jobApplicationsList')) || [];
        // Sort the jobs by applicationDate in descending order (most recent first)
        updatedJobs.sort((a, b) => new Date(b.applicationDate) - new Date(a.applicationDate));
        setJobListings(updatedJobs);
      } catch (error) {
        console.error("Error reading localStorage on update event:", error);
      }
    };

    handleStorageChange(); // Initial load and sort
    window.addEventListener('localStorageUpdated', handleStorageChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('localStorageUpdated', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  // ====================================================================
  // NEW JOB ACTIONS
  // ====================================================================

  const handleDeleteJob = (jobId) => {
    if (window.confirm('Tem certeza que deseja excluir esta vaga?')) {
      try {
        const updatedJobs = jobListings.filter(job => job.id !== jobId);
        localStorage.setItem('jobApplicationsList', JSON.stringify(updatedJobs));
        setJobListings(updatedJobs); // Update state directly
        window.dispatchEvent(new Event('localStorageUpdated')); // Notify other components
        alert('Vaga excluída com sucesso!');
      } catch (error) {
        console.error("Failed to delete job from localStorage:", error);
        alert('Erro ao excluir a vaga.');
      }
    }
  };

  const handleViewJob = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleEditJob = (job) => {
    setSelectedJob(job);
    setIsFormOpen(true);
  };

  const handleAddJob = () => {
    setSelectedJob(null); // No job selected means it's a new entry
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedJob(null); // Clear selected job when closing form
  };

  const handleCloseModal = () => {
      setIsModalOpen(false);
      setSelectedJob(null);
  };

  // Callback from JobApplicationForm after saving
  const handleJobSave = () => {
    // This will trigger the `useEffect` to re-fetch from localStorage
    // or you could update the `jobListings` state directly here if you want
    // more fine-grained control without relying on the event.
    // For now, the `localStorageUpdated` event will handle it.
    handleCloseForm(); // Close the form after save
  };

  // ====================================================================
  // END NEW JOB ACTIONS
  // ====================================================================

  const filteredJobs = jobListings.filter((job) => {
    const statusMatch = filterStatus === 'all' || job.status === filterStatus;
    const searchMatch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.level.toLowerCase().includes(searchTerm.toLowerCase()); // Added more search fields
    return statusMatch && searchMatch;
  });

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredJobs.length / jobsPerPage); i++) {
    pageNumbers.push(i);
  }

  const getStatusDisplay = (status) => {
    switch (status) {
      case 'Inscrito':
        return { text: 'Inscrito', style: { backgroundColor: colors.info } };
      case 'Em análise':
        return { text: 'Em análise', style: jobsTableStyles.status.pending };
      case 'Entrevista':
        return { text: 'Entrevista', style: { backgroundColor: colors.blue } }; // Reusing primary blue
      case 'Teste técnico':
        return { text: 'Teste técnico', style: { backgroundColor: colors.purple } };
      case 'Aprovado':
        return { text: 'Aprovado', style: jobsTableStyles.status.approved };
      case 'Rejeitado':
        return { text: 'Rejeitado', style: jobsTableStyles.status.danger };
      default:
        return { text: status, style: { backgroundColor: colors.gray600 } };
    }
  };

  // ====================================================================
  // Renderiza o formulário ou o dashboard principal
  // ====================================================================
  if (isFormOpen) {
    return (
      <div style={modalOverlayStyles}>
        <div style={modalContentStyles}>
          <button onClick={handleCloseForm} style={modalCloseButtonStyles}>
            <FontAwesomeIcon icon={faTimesCircle} />
          </button>
          <JobApplicationForm
            initialData={selectedJob} // Pass data for editing
            onSave={handleJobSave}   // Callback when form is saved
            onCancel={handleCloseForm} // Pass cancel handler to the form
          />
        </div>
      </div>
    );
  }

  return (
    <div style={dashboardStyles}>
      <main style={mainContentStyles}>
        <header style={contentHeaderStyles}>
          <div style={headerTitleStyles}>
            <h2 style={headerTitleStyles.h2}>Visão Geral</h2>
            <p style={headerTitleStyles.p}>Bem-vindo ao seu painel de controle</p>
          </div>
          <button style={btnPrimaryStyles} onClick={handleAddJob}> {/* Add onClick */}
            <FontAwesomeIcon icon={faPlus} /> Adicionar Vaga
          </button>
        </header>

        <section style={statsCardsStyles}>
          <div style={cardStyles}>
            <div style={{ ...cardIconStyles, ...cardIconStyles.blue }}>
              <FontAwesomeIcon icon={faCalendarDay} style={cardIconStyles.icon} />
            </div>
            <div style={cardInfoStyles}>
              <h3 style={cardInfoStyles.h3}>Vagas Hoje</h3>
              <p style={cardInfoStyles.cardNumber}>
                {jobListings.filter(job => {
                  const today = new Date().toISOString().slice(0, 10);
                  return job.applicationDate === today;
                }).length}
              </p>
            </div>
          </div>
          <div style={cardStyles}>
            <div style={{ ...cardIconStyles, ...cardIconStyles.green }}>
              <FontAwesomeIcon icon={faCalendarWeek} style={cardIconStyles.icon} />
            </div>
            <div style={cardInfoStyles}>
              <h3 style={cardInfoStyles.h3}>Vagas na Semana</h3>
              <p style={cardInfoStyles.cardNumber}>
                  {jobListings.filter(job => {
                      const jobDate = new Date(job.applicationDate + 'T00:00:00'); // Ensure date is parsed correctly
                      const today = new Date();
                      const dayOfWeek = today.getDay(); // 0 for Sunday, 1 for Monday, etc.
                      const startOfWeek = new Date(today);
                      startOfWeek.setDate(today.getDate() - dayOfWeek); // Go to Sunday of current week
                      startOfWeek.setHours(0,0,0,0);

                      const endOfWeek = new Date(startOfWeek);
                      endOfWeek.setDate(startOfWeek.getDate() + 6); // Go to Saturday of current week
                      endOfWeek.setHours(23,59,59,999);

                      return jobDate >= startOfWeek && jobDate <= endOfWeek;
                  }).length}
              </p>
            </div>
          </div>
          
          <div style={cardStyles}>
            <div style={{ ...cardIconStyles, ...cardIconStyles.orange }}>
              <FontAwesomeIcon icon={faCalendarAlt} style={cardIconStyles.icon} />
            </div>
            <div style={cardInfoStyles}>
              <h3 style={cardInfoStyles.h3}>Vagas no Mês</h3>
              <p style={cardInfoStyles.cardNumber}>
                {jobListings.filter(job => {
                  const jobDate = new Date(job.applicationDate);
                  const currentMonth = new Date().getMonth();
                  const currentYear = new Date().getFullYear();
                  return jobDate.getMonth() === currentMonth && jobDate.getFullYear() === currentYear;
                }).length}
              </p>
            </div>
          </div>
          <div style={cardStyles}>
            <div style={{ ...cardIconStyles, ...cardIconStyles.purple }}>
              <FontAwesomeIcon icon={faBriefcase} style={cardIconStyles.icon} />
            </div>
            <div style={cardInfoStyles}>
              <h3 style={cardInfoStyles.h3}>Total de Vagas</h3>
              <p style={cardInfoStyles.cardNumber}>{jobListings.length}</p>
            </div>
          </div>
        </section>

        <section style={jobsTableSectionStyles}>
          <div style={tableHeaderStyles}>
            <h3>Últimas Inscrições</h3>
            <div style={tableActionsStyles}>
              <div style={filterDropdownStyles}>
                <select id="status-filter" value={filterStatus} onChange={handleFilterChange} style={filterDropdownStyles.select}>
                  <option value="all">Todos os status</option>
                  <option value="Inscrito">Inscrito</option>
                  <option value="Em análise">Em análise</option>
                  <option value="Entrevista">Entrevista</option>
                  <option value="Teste técnico">Teste técnico</option>
                  <option value="Aprovado">Aprovado</option>
                  <option value="Rejeitado">Rejeitado</option>
                </select>
              </div>
              <div style={searchBoxStyles}>
                <input
                  type="text"
                  placeholder="Buscar vagas..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  style={searchBoxStyles.input}
                />
                <FontAwesomeIcon icon={faSearch} style={searchBoxStyles.icon} />
              </div>
            </div>
          </div>

          <div style={tableContainerStyles}>
            <table style={jobsTableStyles}>
              <thead>
                <tr>
                  <th style={{ ...jobsTableStyles.th, ...jobsTableStyles.thFirst }}>Nome da Vaga</th>
                  <th style={jobsTableStyles.th}>Empresa</th>
                  <th style={jobsTableStyles.th}>Data</th>
                  <th style={jobsTableStyles.th}>Status</th>
                  <th style={{ ...jobsTableStyles.th, ...jobsTableStyles.thLast }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {currentJobs.length > 0 ? (
                  currentJobs.map((job) => {
                    const statusDisplay = getStatusDisplay(job.status);
                    return (
                      <tr key={job.id}>
                        <td style={{ ...jobsTableStyles.td, ...jobsTableStyles.tdFirst }}>{job.title}</td>
                        <td style={jobsTableStyles.td}>{job.company}</td>
                        <td style={jobsTableStyles.td}>{job.applicationDate}</td>
                        <td style={jobsTableStyles.td}>
                          <span style={{ ...jobsTableStyles.status, ...statusDisplay.style }}>
                            {statusDisplay.text}
                          </span>
                        </td>
                        <td style={{ ...jobsTableStyles.td, ...jobsTableStyles.tdLast, ...jobsTableStyles.actions }}>
                          <button style={btnIconStyles} onClick={() => handleViewJob(job)}>
                            <FontAwesomeIcon icon={faEye} style={btnIconStyles.icon} />
                          </button>
                          <button style={btnIconStyles} onClick={() => handleEditJob(job)}>
                            <FontAwesomeIcon icon={faEdit} style={btnIconStyles.icon} />
                          </button>
                          <button style={btnIconStyles} onClick={() => handleDeleteJob(job.id)}>
                            <FontAwesomeIcon icon={faTrash} style={btnIconStyles.icon} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                      Nenhum resultado encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div style={paginationStyles}>
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                style={{
                  ...paginationStyles.pageBtn,
                  ...(currentPage === number ? paginationStyles.pageBtn.active : paginationStyles.pageBtn.notActive),
                }}
              >
                {number}
              </button>
            ))}
            {pageNumbers.length > 0 && (
              <button
                onClick={() => paginate(Math.min(currentPage + 1, pageNumbers.length))}
                style={paginationStyles.pageBtn}
              >
                <FontAwesomeIcon icon={faChevronRight} style={paginationStyles.pageBtn.icon} />
              </button>
            )}
          </div>
        </section>
      </main>

      {/* View Job Modal */}
      {isModalOpen && selectedJob && (
          <div style={modalOverlayStyles}>
              <div style={modalContentStyles}>
                  <button onClick={handleCloseModal} style={modalCloseButtonStyles}>
                      <FontAwesomeIcon icon={faTimesCircle} />
                  </button>
                  <h3 style={jobDetailsStyles.h3}>Detalhes da Vaga</h3>
                  <p><span style={jobDetailsStyles.label}>Título:</span> {selectedJob.title}</p>
                  <p><span style={jobDetailsStyles.label}>Empresa:</span> {selectedJob.company}</p>
                  <p><span style={jobDetailsStyles.label}>Plataforma:</span> {selectedJob.platform}</p>
                  <p><span style={jobDetailsStyles.label}>Tipo de Contrato:</span> {selectedJob.contractType}</p>
                  <p><span style={jobDetailsStyles.label}>Nível:</span> {selectedJob.level}</p>
                  <p><span style={jobDetailsStyles.label}>Data de Inscrição:</span> {selectedJob.applicationDate}</p>
                  <p><span style={jobDetailsStyles.label}>Link da Vaga:</span> <a href={selectedJob.jobLink} target="_blank" rel="noopener noreferrer">{selectedJob.jobLink}</a></p>
                  <p><span style={jobDetailsStyles.label}>Status:</span> {getStatusDisplay(selectedJob.status).text}</p>
                  <p><span style={jobDetailsStyles.label}>Observações:</span> {selectedJob.observations || 'N/A'}</p>
              </div>
          </div>
      )}
    </div>
  );
};

export default JobDashboard;