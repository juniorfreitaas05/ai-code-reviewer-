'use client';
import { useState } from 'react';

export default function Home() {
  const [codigo, setCodigo] = useState('');
  const [resultado, setResultado] = useState('');

  const analisarCodigo = () => {
    setResultado('O robô está lendo o seu código... Espera um pouquinho! 🤖✨');
  };

  return (
    <main style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Avaliador de Código com IA 🤖</h1>
      <p>Cole o seu código na caixinha abaixo para o robô dizer se está bom ou ruim!</p>
      
      <textarea
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
        placeholder="Cole o seu código aqui..."
        style={{ width: '100%', height: '200px', padding: '10px', fontSize: '16px', borderRadius: '8px', border: '1px solid #ccc' }}
      />
      
      <button 
        onClick={analisarCodigo}
        style={{ marginTop: '10px', padding: '10px 20px', fontSize: '16px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        Avaliar Código! 🚀
      </button>

      {resultado && (
        <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
          <h3>Resultado do Robô:</h3>
          <p>{resultado}</p>
        </div>
      )}
    </main>
  );
}