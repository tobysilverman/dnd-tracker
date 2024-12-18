import { useState } from 'react'

function App() {
  const [characters, setCharacters] = useState([
    { id: 1, name: "Fighter", currentHP: 50, maxHP: 50 },
    { id: 2, name: "Goblin", currentHP: 20, maxHP: 20 }
  ]);

  const adjustHP = (id, amount) => {
    setCharacters(characters.map(char => {
      if (char.id === id) {
        const newHP = Math.min(char.maxHP, Math.max(0, char.currentHP + amount));
        return { ...char, currentHP: newHP };
      }
      return char;
    }));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">D&D Combat Tracker</h1>
      
      {characters.map(char => (
        <div key={char.id} className="mb-4 p-4 border rounded">
          <div className="flex justify-between mb-2">
            <h2 className="text-xl">{char.name}</h2>
            <div>
              HP: {char.currentHP} / {char.maxHP}
            </div>
          </div>
          
          <div className="space-x-2">
            <button 
              onClick={() => adjustHP(char.id, -1)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              -1
            </button>
            <button 
              onClick={() => adjustHP(char.id, 1)}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              +1
            </button>
            <button 
              onClick={() => adjustHP(char.id, -5)}
              className="bg-red-700 text-white px-3 py-1 rounded"
            >
              -5
            </button>
            <button 
              onClick={() => adjustHP(char.id, 5)}
              className="bg-green-700 text-white px-3 py-1 rounded"
            >
              +5
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App