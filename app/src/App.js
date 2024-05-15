import logo from './logo.svg';
import './App.css';
import {useState} from "react";

function App() {


  const [numero, setNumero] = useState(null);
  const [id, setId] = useState(null);
  const [guess, setGuess] = useState(null);
  const [tentativi, setTentativi] = useState(0);
  const [result, setResult] = useState('');
  

  async function AvvioPartita() {
    const response = await fetch("http://localhost:8080/partita", {method: "POST"});
    const data = await response.json();
    setId(data.id);
    setNumero(null);
    setTentativi(0);
    setGuess(data.numero);
    setResult('');
  }

  async function InvioTentativo() {
    const response = await fetch(`http://localhost:8080/partita/${id}`, {method: "PUT" , 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({numero: parseInt(numero)})
    }
    );
    const data = await response.json();
    setTentativi(data.tentativi);
    if(data.risultato === 0) {
      setResult("Congratulazioni hai indovinato il numero");
    } else if(data.risultato === -1) {
      setResult("il numero è troppo piccolo");
    } else {
      setResult("il numero è troppo grande");
    }
  }


  return (
    <div className="App">

      <h2>Indovina Numero</h2>
      <button onClick={AvvioPartita}>Nuova partita</button>

          { id &&

            <>
              <p>ID: {id}</p>
              <p>Tentativi: {tentativi}</p>
              <p>Numero: {guess}</p>
              <div>
                <input type="number" value={numero} onChange={(e) =>
                setNumero(e.target.value)} placeholder='numero...'/>
                <button onClick={InvioTentativo}>Invia</button>
              </div>
              <p>{result}</p>
            </>
          }
    </div>
);
}

export default App;
