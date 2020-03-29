import React, { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
// services
import api from '../../services/api'
// react-native components
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'
// logo
import appLogo from '../../assets/logo.png'
// styles
import styles from './styles'

export default function Incidents() {
  // incidents
  const [incidents, setIncidents] = useState([])
  // total number of registered incidents
  const [total, setTotal] = useState(0)
  // page
  const [page, setPage] = useState(1)
  //
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation()

  useEffect(() => {
    loadIncidents()
  }, [])

  async function loadIncidents() {
    if (loading) {
      return
    }

    if (total > 0 && incidents.length === total) {
      return
    }

    try {
      setLoading(true)
      const response = await api.get('/incidents', {
        params: { page }
      })

      setIncidents([...incidents, ...response.data])
      setTotal(response.headers['x-total-count'])

      setPage(page + 1)
      setLoading(false)
    } catch (error) {
      console.error(error, ' - Falha na requisição');

    }
  }

  function navigationToDetail(incident) {
    navigation.navigate('Detail', { incident })
  }

  return(
    <View style={styles.container}>
      {/* header of the screen */}
      <View style={styles.header}>
        <Image source={appLogo} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>
        </Text>
      </View>
      {/* end header of the screen */}
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>
      {/* incident list */}
      <FlatList
        data={incidents}
        style={styles.incidentList}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>Caso:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>Valor:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigationToDetail(incident)}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#e02041" />
            </TouchableOpacity>
          </View>
        )}
      />
      {/* end incident list */}
    </View>
  )
}
