// src/components/Pg.jsx (JobApplicationForm)

import React, { useState, useEffect } from 'react';
import styles from '../style/Pg.module.css';

// O componente agora aceita props: initialData (para preencher na edição) e onSave (callback após salvar/editar)
const JobApplicationForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    company: '',
    platform: '',
    contractType: '',
    level: '',
    applicationDate: '',
    jobLink: '',
    status: '',
    observations: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [isEditing, setIsEditing] = useState(!!initialData); // True if initialData is provided

  // useEffect para resetar o formulário ou definir initialData quando a prop muda
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setIsEditing(true);
    } else {
      setFormData({
        title: '',
        company: '',
        platform: '',
        contractType: '',
        level: '',
        applicationDate: '',
        jobLink: '',
        status: '',
        observations: ''
      });
      setIsEditing(false);
    }
    setSuccessMessage(''); // Clear message on new load/edit
  }, [initialData]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let updatedJob;
    if (isEditing) {
      // If editing, use the existing ID
      updatedJob = { ...formData, id: initialData.id };
    } else {
      // If creating new, generate a new ID
      updatedJob = {
        id: Date.now(), // Simple unique ID using timestamp
        ...formData,
      };
    }

    try {
      let existingJobs = JSON.parse(localStorage.getItem('jobApplicationsList')) || [];

      if (isEditing) {
        // Find and replace the edited job
        existingJobs = existingJobs.map(job =>
          job.id === updatedJob.id ? updatedJob : job
        );
        setSuccessMessage('Vaga atualizada com sucesso!');
      } else {
        // Add new job
        existingJobs = [...existingJobs, updatedJob];
        setSuccessMessage('Vaga salva com sucesso e adicionada ao dashboard!');
      }

      localStorage.setItem('jobApplicationsList', JSON.stringify(existingJobs));

      // Notify dashboard component that data has changed
      window.dispatchEvent(new Event('localStorageUpdated'));

      // Call the onSave callback passed from the parent (JobDashboard)
      if (onSave) {
        onSave();
      }

      // Clear the form only if it was a new entry or specifically desired after edit
      if (!isEditing) {
        setFormData({
          title: '',
          company: '',
          platform: '',
          contractType: '',
          level: '',
          applicationDate: '',
          jobLink: '',
          status: '',
          observations: ''
        });
      }


    } catch (error) {
      console.error("Failed to save job application to localStorage:", error);
      setSuccessMessage('Erro ao salvar/atualizar a vaga.');
    }
  };

  const handleCancel = () => {
    // Call the onCancel callback passed from the parent (JobDashboard)
    if (onCancel) {
      onCancel();
    } else {
      // If no onCancel prop, just reset form for new entry context
      setFormData({
        title: '', company: '', platform: '', contractType: '',
        level: '', applicationDate: '', jobLink: '', status: '', observations: ''
      });
      setSuccessMessage('');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{isEditing ? 'Editar Vaga' : 'Cadastro de Vaga'}</h2>

      {successMessage && (
        <div className={styles.successMessage}>
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* All your form fields here (same as before) */}
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>Título da vaga*</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className={styles.input} required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="company" className={styles.label}>Empresa*</label>
          <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className={styles.input} required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="platform" className={styles.label}>Plataforma*</label>
          <select id="platform" name="platform" value={formData.platform} onChange={handleChange} className={styles.select} required>
            <option value="">Selecione...</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Indeed">Indeed</option>
            <option value="Glassdoor">Glassdoor</option>
            <option value="Vagas.com">Vagas.com</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="contractType" className={styles.label}>Tipo de Contrato*</label>
          <select id="contractType" name="contractType" value={formData.contractType} onChange={handleChange} className={styles.select} required>
            <option value="">Selecione...</option>
            <option value="CLT">CLT</option>
            <option value="PJ">PJ</option>
            <option value="Estágio">Estágio</option>
            <option value="Freelancer">Freelancer</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="level" className={styles.label}>Nível*</label>
          <select id="level" name="level" value={formData.level} onChange={handleChange} className={styles.select} required>
            <option value="">Selecione...</option>
            <option value="Júnior">Júnior</option>
            <option value="Pleno">Pleno</option>
            <option value="Sênior">Sênior</option>
            <option value="Estagiário">Estagiário</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="applicationDate" className={styles.label}>Data de Inscrição*</label>
          <input type="date" id="applicationDate" name="applicationDate" value={formData.applicationDate} onChange={handleChange} className={styles.input} required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="jobLink" className={styles.label}>Link da Vaga*</label>
          <input type="url" id="jobLink" name="jobLink" value={formData.jobLink} onChange={handleChange} className={styles.input} placeholder="https://..." required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="status" className={styles.label}>Status*</label>
          <select id="status" name="status" value={formData.status} onChange={handleChange} className={styles.select} required>
            <option value="">Selecione...</option>
            <option value="Inscrito">Inscrito</option>
            <option value="Em análise">Em análise</option>
            <option value="Entrevista">Entrevista</option>
            <option value="Teste técnico">Teste técnico</option>
            <option value="Aprovado">Aprovado</option>
            <option value="Rejeitado">Rejeitado</option> {/* Added for consistency */}
          </select>
        </div>

        <div className={`${styles.formGroup} ${styles.observationsField}`}>
          <label htmlFor="observations" className={styles.label}>Observações</label>
          <textarea id="observations" name="observations" value={formData.observations} onChange={handleChange} className={styles.textarea} rows="4" placeholder="Detalhes adicionais sobre o processo..."></textarea>
        </div>

        <div className={styles.formActions}>
          <button
            type="button"
            className={`${styles.button} ${styles.cancelButton}`}
            onClick={handleCancel} // Uses the new handleCancel prop
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={`${styles.button} ${styles.saveButton}`}
          >
            {isEditing ? 'Atualizar Vaga' : 'Salvar Vaga'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobApplicationForm;