import { useEffect, useState } from 'react'
import './App.css'

function App() {

  interface Racas {

    nome: string

  }

  const [racas, setRacas] = useState<Racas[]>([])
  const [busca, setBusca] = useState<string>('')

  async function receberDadosApi(url: string): Promise<void> {

    const resposta = await fetch(url)

    const dados = await resposta.json()

    setRacas(dados)

  }

  // Função que é executada sempre quando que o componente é renderizado! Ou seja, toda vez que o estado é atualizado ele executa, criando um loop infinto, muito cuidado!
  useEffect((): void => {
    
    receberDadosApi('http://localhost:8080/doguinhos')

  }, []) // Ao passar uma array vazia o useEffect só vai funcionar na primeira renderização

  useEffect(() => {

    const url = (busca && busca.length > 3)
                ? `http://localhost:8080/doguinhos?nome=${busca}`
                : 'http://localhost:8080/doguinhos'

    receberDadosApi(url)

  }, [busca]) // Essa array é uma array de depedências, ou seja, a função contida no useEffect só vai ser acionado assim que os estados dessa array mudarem. Caso estiver vazio só ocorre na primeira renderização

  return (
    <>
      <h1>Bem vindo aos doguinhos</h1>
      <h4>Confira abaixo uma lista de raças dos doguinhos</h4>
      <input onChange={evento => setBusca(evento.target.value)} placeholder='Buscar por raça' />
      <ul>
        {racas.map(raca => <li key={raca.nome}>{raca.nome}</li>)}
      </ul>
    </>
  )
}

export default App
