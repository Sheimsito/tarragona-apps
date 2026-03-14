import { useState } from 'react'
import './App.css'

function CalendarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
  )
}

function App() {
  const [cedula, setCedula] = useState('')
  const [invitados, setInvitados] = useState('')
  const [duracion, setDuracion] = useState('')
  const [fiestas, setFiestas] = useState([])
  const [informe, setInforme] = useState(null)
  const [errores, setErrores] = useState({})

  const agregarFiesta = () => {
    
    const nuevosErrores = {}
    
    if (!cedula.trim()) {
      nuevosErrores.cedula = 'La cédula es requerida'
    } else if (cedula.trim().length < 7) {
      nuevosErrores.cedula = 'La cédula debe tener al menos 7 dígitos'
    } else if (cedula.trim().length > 10) {
      nuevosErrores.cedula = 'La cédula debe tener como máximo 10 dígitos'
    }

    if (!invitados) {
      nuevosErrores.invitados = 'La cantidad de invitados es requerida'
    } else if (parseInt(invitados) < 1) {
      nuevosErrores.invitados = 'Debe haber al menos 1 invitado'
    }

    if (!duracion) {
      nuevosErrores.duracion = 'La duración es requerida'
    } else if (parseFloat(duracion) < 0.5) {
      nuevosErrores.duracion = 'La duración mínima es de 0.5 horas'
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores)
      return
    }

    setErrores({})

    const nueva = {
      id: Date.now(),
      cedula: cedula.trim(),
      invitados: parseInt(invitados),
      duracion: parseFloat(duracion),
      fecha: new Date().toLocaleDateString('es-ES'),
    }
    var tarifa = 0;
    if (1 <= invitados && invitados <= 100) {
      tarifa = 8000;
    } else if ( 101 <= invitados && invitados <= 500) {
      tarifa = 6000;
    } else if ( invitados > 500) {
      tarifa = 4000;
    }
   
    var cuotaHora = 0
    if (1 <= duracion && duracion <= 3) {
      cuotaHora = 100000;
    } else if ( 4 <= duracion && duracion <= 6) {
      cuotaHora = 200000;
    } else if ( duracion > 6) {
      cuotaHora = 300000;
    }
    nueva.tarifa = tarifa;
    nueva.cuotaHora = cuotaHora;
    console.log(tarifa)
    console.log(cuotaHora)
    setFiestas((prev) => [...prev, nueva])
    setCedula('')
    setInvitados('')
    setDuracion('')
    setInforme(null)
    setErrores({})
  }

  const calcularInforme = () => {
    if (fiestas.length === 0) {
      setInforme({ totalFiestas: 0, totalInvitados: 0, totalHoras: 0 })
      return
    }
    const totalInvitados = fiestas.reduce((acc, f) => acc + f.invitados, 0)
    const totalHoras = fiestas.reduce((acc, f) => acc + f.duracion, 0)
    const totalFiestas3Horas = fiestas.filter(f => f.duracion <= 3).length
    const totalFiestas6Horas = fiestas.filter(f => f.duracion <= 6).length - totalFiestas3Horas
    const totalFiestasMas6Horas = fiestas.filter(f => f.duracion > 6).length 
    const totalFiestas = fiestas.length
    setInforme({ totalFiestas, totalInvitados, totalHoras, totalFiestas3Horas, totalFiestas6Horas, totalFiestasMas6Horas })
  }

  return (
    <div className="app-wrapper">
      {/* Header */}
      <header className="header">
        <div className="header-logo">
          <div className="logo-circle">
            <StarIcon />
          </div>
          <span className="header-title">
            <span className="title-light">Fiestas y Eventos</span>{' '}
            <span className="title-bold">Tarragona</span>
          </span>
        </div>
      </header>

      {/* Main content */}
      <main className="main-content">
        {/* Left: Registration Form */}
        <section className="card form-card">
          <h2 className="card-title">
            <span className="accent-bar" />
            Registro de Fiesta
          </h2>

          <div className="form-group">
            <label htmlFor="cedula">Cédula del Contratista</label>
            <input
              id="cedula"
              type="number"
              placeholder="Ej: 12345678"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              className={errores.cedula ? 'input-error' : ''}
            />
            {errores.cedula && <span className="error-text">{errores.cedula}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="invitados">Invitados</label>
              <input
                id="invitados"
                type="number"
                placeholder="Cant."
                min="1"
                value={invitados}
                onChange={(e) => setInvitados(e.target.value)}
                className={errores.invitados ? 'input-error' : ''}
              />
              {errores.invitados && <span className="error-text">{errores.invitados}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="duracion">Duración (Horas)</label>
              <input
                id="duracion"
                type="number"
                placeholder="Horas"
                min="0.5"
                step="0.5"
                value={duracion}
                onChange={(e) => setDuracion(e.target.value)}
                className={errores.duracion ? 'input-error' : ''}
              />
              {errores.duracion && <span className="error-text">{errores.duracion}</span>}
            </div>
          </div>

          <button className="btn btn-primary" onClick={agregarFiesta}>
            Agregar Fiesta
          </button>
          <button className="btn btn-secondary" onClick={calcularInforme}>
            Calcular Informe Mensual
          </button>

          {informe && (
            <div className="informe-box">
              <p><strong>Informe Mensual</strong></p>
              <p>Total invitados: <strong>{informe.totalInvitados}</strong></p>
              <p>Total horas: <strong>{informe.totalHoras}h</strong></p>
              <p>Total fiestas 1-3 horas: <strong>{informe.totalFiestas3Horas}</strong></p>
              <p>Total fiestas 4-6 horas: <strong>{informe.totalFiestas6Horas}</strong></p>
              <p>Total fiestas mas de 6 horas: <strong>{informe.totalFiestasMas6Horas}</strong></p>
            </div>
          )}
        </section>

        {/* Right: Registered parties */}
        <section className="card list-card">
          <div className="list-header">
            <h2 className="card-title">
              <span className="accent-bar" />
              Fiestas Registradas
            </h2>
            <span className="badge">{fiestas.length} Eventos</span>
          </div>

          {fiestas.length === 0 ? (
            <div className="empty-state">
              <CalendarIcon />
              <p>No hay fiestas registradas en este momento.</p>
            </div>
          ) : (
            <ul className="fiestas-list">
              {fiestas.map((f) => (
                <li key={f.id} className="fiesta-item">
                  <div className="fiesta-info">
                    <span className="fiesta-cedula">CC: {f.cedula}</span>
                    <span className="fiesta-fecha">{f.fecha}</span>
                  </div>
                  <div className="fiesta-details">
                    <span> {f.invitados} invitados</span>
                    <span> ⏱ {f.duracion}h</span>
                    <span> Monto: ${(f.invitados * f.tarifa) + (f.cuotaHora)} </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 Compañía de Fiestas y Eventos Tarragona.</p>
      </footer>
    </div>
  )
}

export default App
