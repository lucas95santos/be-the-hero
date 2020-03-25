import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
// services
import api from '../../services/api'
// react icons
import { FiArrowLeft } from 'react-icons/fi'
// styles
import './styles.css'
// images
import logoImg from '../../assets/logo.svg'

export default function SignUp() {
  // atributos do cadastro
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [city, setCity] = useState('')
  const [uf, setUf] = useState('')
  // constante para manipular o histórico de navegação da DOM
  const history = useHistory()

  async function handleSignUp(event) {
    event.preventDefault()

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf: uf.toUpperCase()
    }

    try {
      const response = await api.post('/ongs', data)

      resetInputs()

      alert(`Seu ID de acesso é: ${response.data.id}`)

      history.push('/')
    } catch (error) {
      alert('Erro no cadastro, tente novamente')
    }
  }

  function resetInputs() {
    setName('')
    setEmail('')
    setWhatsapp('')
    setCity('')
    setUf('')
  }

  return(
    <div className="signup-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>

          <h1>Cadastro</h1>

          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.
          </p>

          <Link to="/" className="link">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para o logon
          </Link>
        </section>

        <form onSubmit={handleSignUp} id="formSignUp">
          <input
            placeholder="Nome da ONG"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}
            />

            <input
              placeholder="UF"
              style={{ width: 80 }}
              maxLength={2}
              id="uf"
              value={uf}
              onChange={e => setUf(e.target.value)}
            />
          </div>

          <button type="submit" className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}
