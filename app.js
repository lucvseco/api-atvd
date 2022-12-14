import { StatusBar } from 'expo-status-bar';
import react from 'react'

import { StyleSheet, Text, View, TextInput } from 'react-native';


export default function App() {
  const [text, onChangeText] = react.useState('');
  const [data, setData] = react.useState(null);

  const getCep = async (e) =>{
    try {
      const response = await fetch(`https://viacep.com.br/ws/${text}/json/`);
      if(response.ok === false) {
        setData(null)
        return
      }
      
      const json = await response.json();
      setData(json)
    } catch(err) {
      console.log(err)
    }
  }

  react.useEffect(()=>{
    getCep()
  },[text])

  console.log(data)
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>React Native Busca CEP</Text>

      <TextInput style={styles.input}   placeholder="Digite seu  CEP" onChangeText={onChangeText} value={text}></TextInput>
      <StatusBar style="auto" />
      <View style={styles.conteudo}>
      {data ? 
        <>
        <Text style={styles.conteudoItem}>Endereço: {data.logradouro}</Text>
        <Text style={styles.conteudoItem}>Bairro: {data.logradouro}</Text>
        <Text style={styles.conteudoItem}>Cidade: {data.localidade}</Text>
        <Text style={styles.conteudoItem}>UF: {data.uf}</Text>
        <Text style={styles.conteudoItem}>IBGE: {data.ibge}</Text>
        <Text style={styles.conteudoItem}>DDD: {data.ddd}</Text>
        </>

        : <Text style={styles.message}>Nenhum dado encontrado...</Text>  }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#274690',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 32,
  },

  titulo:{
    fontSize: 24,
    color: '#fff',
    textTransform: 'uppercase',
    marginBottom: 64
  },

  input: {
    width: '100%',
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 4,
    fontSize:16,
    paddingVertical: 8,
    paddingLeft: 8,
    paddingRight: 32,
    marginTop: 8,
    textAlign: 'left'
  },
  conteudo:{
    backgroundColor: '#fff',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 4,
    marginTop: 32
  },
  conteudoItem:{
    fontSize: 16,
    color: '#1f1f1f',

    borderBottomWidth: 1,
    padding: 8,
    borderBottomColor: '#eee'
    
  },
  message: {
    fontSize: 16,
    textAlign: 'center'
  },
  credito:{
    fontSize: 12,
    color: '#fff',
    textTransform: 'uppercase',
    marginTop: 32
  },
});
