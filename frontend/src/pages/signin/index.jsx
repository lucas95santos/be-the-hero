import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
// services
import api from '../../services/api'
// react icons
import { FiLogIn } from 'react-icons/fi'
// styles
import './styles.css'
// images
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'

export default function SignIn() {
  const [id, setId] = useState('')
  // constante para manipular o histórico de navegação da DOM
  const history = useHistory()

  async function handleSignIn(event) {
    event.preventDefault()

    try {
      const response = await api.post('/sessions', { id })

      localStorage.setItem('ongId', id)
      localStorage.setItem('ongName', response.data.name)

      history.push('/profile')
    } catch (error) {
      alert('Falha no login')
    }
  }

  return(
    <div className="signin-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero"/>

        <form onSubmit={handleSignIn}>
          <h1>Faça seu logon</h1>

          <input
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />

          <button type="submit" className="button">Entrar</button>

          <Link to="/register" className="link">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes" id="hero-img" />
    </div>
  )
}
