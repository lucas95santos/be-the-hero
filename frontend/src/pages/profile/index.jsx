import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
// services
import api from '../../services/api'
// react icons
import { FiPower, FiTrash2 } from 'react-icons/fi'
// styles
import './styles.css'
// images
import logoImg from '../../assets/logo.svg'

export default function Profile() {
  const history = useHistory()

  const ongId = localStorage.getItem('ongId')
  const ongName = localStorage.getItem('ongName') || 'ONG'

  const [incidents, setIncidents] = useState([])

  useEffect(() => {
    api.get('/profile', {
      headers: {
        Authorization: ongId
      }
    }).then(response => {
      setIncidents(response.data)
    })
  }, [ongId])

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`/incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      })

      setIncidents(incidents.filter(incident => incident.id !== id))
    } catch (error) {
      alert('Erro ao remover caso, tente novamente')
    }
  }

  function handleLogout() {
    localStorage.clear()

    history.push('/')
  }

  return(
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero"/>
        <span>Bem vinda, {ongName}</span>

        <Link to="/incidents/new" className="button">
          Cadastrar novo caso
        </Link>

        <button type="button" title="Sair" onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>
              {
                Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
                .format(incident.value)
              }
            </p>

            <button type="button" title="Remover caso" onClick={() => handleDeleteIncident(incident.id)}>
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
        {incidents.length <= 0 && (
          <p className="no-incidents">Sua ONG ainda não possui casos cadastrados</p>
        )}
      </ul>
    </div>
  )
}
