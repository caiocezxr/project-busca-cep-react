import { useState } from 'react';
import { FiSearch } from 'react-icons/fi'
import './style.css';
import api from './services/api'
import img from './img/11b51bd2-aedc-40b0-ad8b-48386b457eef.jpeg'
// import { IoMdMap } from 'react-icons/io';
// import img2 from './img2/img631cd45cd594e3.82000930.jpg'


function App() {
  
  const [input, setInput] = useState('')
  const [cep, setCep] = useState({}); //aqui fica o objeto com os itens
  
  async function handleSearch (){
    if(input === ''){
      alert('Preencha o campo!')
      return;
    }

    try{
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput('')
    }catch{
      alert("Erro ao buscar CEP");
      setInput('')
    }
  }
  
  return (
    <div className="container">
          <h1 className="title">BUSCA RATO</h1>
        <div className="containerInput">
          <input type="text"
          placeholder="Digite seu CEP"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          />
          <button className="btnSearch" onClick={handleSearch}>
            <FiSearch size={25} color='#FFF'/>
          </button>
      </div>

    {Object.keys(cep).length > 0 && ( //essa e a forma de verificar se tem alguma propriedade dentro do objeto. se o tamanho é maior que 0 tem alguma coisa.
        <main className='main'>
        
        <h2>CEP: {cep.cep} </h2>
        <span> {cep.logradouro} </span>
        <span>{cep.complemento}</span>
        <span>{cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf} </span>
        <img className='rato' src={img} alt=''/>
      </main>
)}

    </div>
  );
}

export default App;
