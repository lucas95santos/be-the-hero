import React, { useState }  from 'react'
import { Link, useHistory } from 'react-router-dom'
// services
import api from '../../services/api'
// react icons
import { FiArrowLeft } from 'react-icons/fi'
// styles
import './styles.css'
// images
import logoImg from '../../assets/logo.svg'

export default function NewIncident() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')

  const ongId = localStorage.getItem('ongId')

  const history = useHistory()

  async function handleNewIncident(event) {
    event.preventDefault()

    const data = {
      title,
      description,
      value
    }

    try {
      await api.post('/incidents', data, {
        headers: {
          Authorization: ongId
        }
      })

      history.push('/profile')
    } catch (error) {
      alert('Erro ao cadastrar novo caso, tente novamente.')
    }
  }

  return(
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>

          <h1>Cadastrar novo caso</h1>

          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver isso.
          </p>

          <Link to="/profile" className="link">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para a home
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Titulo do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <textarea
            cols="30"
            rows="10"
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <input
            placeholder="Valor em reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button
            type="submit"
            className="button"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}
