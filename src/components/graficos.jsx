import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Main Grafico component
const Grafico = () => {
    const [jobListings, setJobListings] = useState([]); // State to hold job listings data
useEffect(() => {
  const loadJobs = () => {
    try {
      const savedJobs = localStorage.getItem('jobApplicationsList');
      setJobListings(savedJobs ? JSON.parse(savedJobs) : []);
    } catch (error) {
      setJobListings([]);
      console.error("Erro ao carregar os dados das vagas:", error);
    }
  };

  loadJobs();

  window.addEventListener('localStorageUpdated', loadJobs);
  window.addEventListener('storage', loadJobs);

  return () => {
    window.removeEventListener('localStorageUpdated', loadJobs);
    window.removeEventListener('storage', loadJobs);
  };
}, []);
 

// ...seu código de estado e carregamento de jobListings...

const diasSemana = [
  { name: 'Domingo', day: 0 },
  { name: 'Segunda', day: 1 },
  { name: 'Terça', day: 2 },
  { name: 'Quarta', day: 3 },
  { name: 'Quinta', day: 4 },
  { name: 'Sexta', day: 5 },
  { name: 'Sábado', day: 6 },
];

// Função para filtrar por semana atual
function isThisWeek(date) {
  const now = new Date();
  const d = new Date(date);
  const first = now.getDate() - now.getDay();
  const last = first + 6;
  const firstDay = new Date(now.setDate(first));
  const lastDay = new Date(now.setDate(last));
  return d >= firstDay && d <= lastDay;
}

// Função para filtrar por mês atual
function isThisMonth(date) {
  const now = new Date();
  const d = new Date(date);
  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
}

// Dados semanais
const weeklyData = diasSemana.map(({ name, day }) => ({
  name,
  vagas: jobListings.filter(j => {
    if (!j.applicationDate) return false;
    const d = new Date(j.applicationDate);
    return !isNaN(d) && d.getDay() === day && isThisWeek(d);
  }).length,
}));

// Dados mensais
const monthlyData = diasSemana.map(({ name, day }) => ({
  name,
  vagas: jobListings.filter(j => {
    if (!j.applicationDate) return false;
    const d = new Date(j.applicationDate);
    return !isNaN(d) && d.getDay() === day && isThisMonth(d);
  }).length,
}));

// Dados gerais (todas as semanas/meses)
const geralData = diasSemana.map(({ name, day }) => ({
  name,
  vagas: jobListings.filter(j => {
    if (!j.applicationDate) return false;
    const d = new Date(j.applicationDate);
    return !isNaN(d) && d.getDay() === day;
  }).length,
}));

// Estado para seleção do filtro
const [periodo, setPeriodo] = useState('semana');

let data;
if (periodo === 'semana') data = weeklyData;
else if (periodo === 'mes') data = monthlyData;
else data = geralData;

const totalEntrevistas = jobListings.filter(j => j.entrevista === true).length;
const totalVagas = jobListings.length;
const porcentagemEntrevistas = totalVagas > 0 ? ((totalEntrevistas / totalVagas) * 100).toFixed(1) : 0;




  // Data for Qthe contract/level distribution chart
const contractTypes = ['CLT', 'PJ', 'Estágio', 'Trainee', 'Pleno', 'Sênior'];

const contractData = contractTypes.map(type => ({
  name: type,
  value: jobListings.filter(j => j.contractType === type).length
}));

  // Data for the platform chart
const platforms = ['LinkedIn', 'Indeed', 'Gupy', 'Vagas.com', 'Glassdoor', 'Outra'];

const platformData = platforms.map(name => ({
  name,
  vagas: jobListings.filter(j => j.platform === name).length
}));

  // Colors for the charts, maintaining a similar palette to the original CSS
  const COLORS = [
    '#4361ee', '#3f37c9', '#4895ef', '#4cc9f0', '#5e60ce', '#560bad'
  ];

  // Custom Tooltip for Bar Charts (Weekly & Platform)
  const CustomBarTooltip = ({ active, payload, label, dataKeyLabel }) => {
    if (active && payload && payload.length) {
      return (
        <div className="tooltip-card">
          <p className="tooltip-title">{label}</p>
          <p className="tooltip-content">{`${dataKeyLabel}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  // Custom Tooltip for Doughnut Chart (Contract)
  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const total = contractData.reduce((sum, entry) => sum + entry.value, 0);
      const percentage = ((payload[0].value / total) * 100).toFixed(0);
      return (
        <div className="tooltip-card">
          <p className="tooltip-title">{payload[0].name}</p>
          <p className="tooltip-content">{`Quantidade: ${payload[0].value} (${percentage}%)`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="dashboard-container">
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />

      <style>
        {`
        :root {
            --primary-color: #4361ee;
            --secondary-color: #3f37c9;
            --accent-color: #4895ef;
            --background-color: #f8f9fa;
            --card-color: #ffffff;
            --text-color: #333333;
            --border-radius: 12px;
            --shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        body {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', sans-serif;
            background-color: var(--background-color);
            color: var(--text-color);
            padding: 20px;
        }

        .dashboard-container {
            min-height: 100vh;
            background-color: var(--background-color);
            color: var(--text-color);
            padding: 20px;
            font-family: 'Inter', sans-serif;
            max-width: 1200px;
            margin: 0 auto;
        }

        .dashboard-header {
            margin-bottom: 32px;
            text-align: center;
        }

        .dashboard-header h1 {
            font-size: 2.25rem; /* text-3xl */
            font-weight: 600; /* font-semibold */
            margin-bottom: 0.5rem; /* mb-2 */
            color: #1a202c; /* gray-900 */
        }

        .dashboard-header p {
            font-size: 1.125rem; /* text-lg */
            color: #4a5568; /* gray-600 */
        }

        .charts-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 24px;
            margin-bottom: 24px;
        }

        .chart-card {
            background-color: var(--card-color);
            border-radius: var(--border-radius);
            box-shadow: var(--shadow);
            padding: 20px;
            transition: transform 0.3s ease;
        }

        .chart-card:hover {
            transform: translateY(-5px);
        }

        .chart-header {
            margin-bottom: 1rem; /* mb-4 */
            text-align: center;
        }

        .chart-header h2 {
            font-size: 1.25rem; /* text-xl */
            font-weight: 600; /* font-semibold */
            color: #2d3748; /* gray-800 */
        }

        .chart-responsive-container {
            height: 288px; /* h-72 */
            width: 100%; /* w-full */
        }

        .pie-chart-container {
            height: 288px; /* h-72 */
            width: 100%; /* w-full */
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .recharts-text.recharts-label {
            font-size: 0.875rem; /* text-sm */
            fill: #4a5568; /* gray-600 */
        }
        .recharts-cartesian-axis-tick-value {
            font-size: 0.875rem; /* text-sm */
        }

        .tooltip-card {
            padding: 8px; /* p-2 */
            background-color: #ffffff; /* bg-white */
            border-radius: 8px; /* rounded-lg */
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-md */
            border: 1px solid #e2e8f0; /* border border-gray-200 */
        }

        .tooltip-title {
            font-weight: 600; /* font-semibold */
            color: #4a5568; /* gray-700 */
        }

        .tooltip-content {
            color: #718096; /* gray-600 */
        }

        @media (max-width: 768px) {
            .charts-container {
                grid-template-columns: 1fr;
            }
            .chart-responsive-container, .pie-chart-container {
                height: 250px;
            }
        }
        `}
      </style>

      <div className="max-w-6xl mx-auto">
        {/* Dashboard Header */}
        <div className="dashboard-header">
          <h1>Dashboard de Vagas</h1>
          <p>Análise e visualização de dados de vagas de emprego</p>
        </div>

<div className="charts-container">
  <div className="chart-card">
    <div className="chart-header">
      <h2>Vagas por Período</h2>
      <select value={periodo} onChange={e => setPeriodo(e.target.value)}>
        <option value="semana">Esta Semana</option>
        <option value="mes">Este Mês</option>
        <option value="geral">Geral</option>
      </select>
    </div>
    <div className="chart-responsive-container">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} className="recharts-cartesian-axis-tick-value" />
          <YAxis
            tickFormatter={(value) => Math.round(value)}
            allowDecimals={false}
            interval="preserveStartEnd"
            axisLine={false}
            tickLine={false}
            className="recharts-cartesian-axis-tick-value"
            label={{ value: 'Quantidade de Vagas', angle: -90, position: 'insideLeft', offset: -10, className: 'recharts-text recharts-label' }}
          />
          <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} content={<CustomBarTooltip dataKeyLabel="Quantidade de Vagas" />} />
          <Bar dataKey="vagas" fill={COLORS[0]} radius={[6, 6, 0, 0]} animationBegin={500} animationDuration={1000} />
        </BarChart>
      </ResponsiveContainer>
    </div>
</div>
          {/* Contract Type/Level Distribution Chart Card */}
          <div className="chart-card">
            <div className="chart-header">
              <h2>Distribuição por Tipo de Contrato ou Nível</h2>
            </div>
            <div className="pie-chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={contractData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    animationBegin={500} animationDuration={1000}
                  >
                    {contractData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                  <Legend
                    verticalAlign="middle"
                    align="right"
                    layout="vertical"
                    iconSize={15}
                    wrapperStyle={{ paddingLeft: '15px' }}
                    formatter={(value, entry) => (
                      <span className="recharts-cartesian-axis-tick-value">{entry.payload.name}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          

          {/* Platform Vacancies Chart Card */}
          <div className="chart-card">
            <div className="chart-header">
              <h2>Vagas por Plataforma</h2>
            </div>
            <div className="chart-responsive-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical" // For horizontal bar chart
                  data={platformData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis
                    type="number"
                    tickFormatter={(value) => Math.round(value)}
                    allowDecimals={false}
                    interval="preserveStartEnd"
                    axisLine={false}
                    tickLine={false}
                    className="recharts-cartesian-axis-tick-value"
                    label={{ value: 'Quantidade de Vagas', position: 'insideBottom', offset: -5, className: 'recharts-text recharts-label' }}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    className="recharts-cartesian-axis-tick-value"
                    label={{ value: 'Plataforma', angle: -90, position: 'insideLeft', offset: -10, className: 'recharts-text recharts-label' }}
                  />
                  <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} content={<CustomBarTooltip dataKeyLabel="Quantidade de Vagas" />} />
                  <Bar dataKey="vagas" fill={COLORS[3]} radius={[0, 6, 6, 0]} animationBegin={500} animationDuration={1000} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="indicadores-entrevista">
  <h3>Entrevistas Participadas</h3>
  <p>
    {totalEntrevistas} de {totalVagas} vagas (
    {porcentagemEntrevistas}%)
  </p>
</div>
        </div>
      </div>
    </div>
  );
};

export default Grafico;
