'use client';
import { useState } from 'react';

export default function Home() {
  const [codigo, setCodigo] = useState('');
  const [resultado, setResultado] = useState('');
  const [carregando, setCarregando] = useState(false);

  const analisarCodigo = async () => {
    if (!codigo.trim()) return;
    
    setCarregando(true);
    setResultado('O robô está analisando o seu código minuciosamente... Aguarde! 🤖✨');

    try {
      const response = await fetch('/api/analisar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ codigo }),
      });

      const data = await response.json();
      
      if (data.error) {
        setResultado(`Ops! Ocorreu um erro: ${data.error}`);
      } else {
        setResultado(data.resultado);
      }
    } catch (error) {
      setResultado('Não foi possível conectar ao robô. Verifique sua conexão.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Avaliador de Código com IA 🤖</h1>
      <p>Cole o seu código na caixinha abaixo para o robô dizer se está bom ou ruim!</p>
      
      <textarea
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
        placeholder="Cole o seu código aqui..."
        style={{ width: '100%', height: '200px', padding: '10px', fontSize: '16px', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '10px' }}
      />
      
      <button 
        onClick={analisarCodigo}
        disabled={carregando}
        style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: carregando ? '#ccc' : '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: carregando ? 'not-allowed' : 'pointer' }}
      >
        {carregando ? 'Analisando...' : 'Avaliar Código! 🚀'}
      </button>

      {resultado && (
        <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #ddd', whiteSpace: 'pre-wrap' }}>
          <h3>Resultado do Robô:</h3>
          <p>{resultado}</p>
        </div>
      )}
    </main>
  );
}