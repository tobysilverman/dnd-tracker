import React, { useState } from 'react';

// Component for the table headers
const TableHeader = () => (
  <div className="grid grid-cols-4 gap-2 sm:gap-4 font-bold mb-2 text-gray-300">
    <div>NAME</div>
    <div>HP</div>
    <div>AC</div>
    <div>Round</div>
  </div>
);

// Component for a single combatant row
const CombatantRow = ({ combatant, isNewRow, onChange }) => {
  if (isNewRow) {
    return (
      <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-2">
        <input
          type="text"
          value={combatant.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="Name"
          className="bg-gray-700 border border-gray-600 p-1 sm:p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-200 placeholder-gray-400"
        />
        <input
          type="number"
          value={combatant.hp}
          onChange={(e) => onChange('hp', e.target.value)}
          placeholder="HP"
          className="bg-gray-700 border border-gray-600 p-1 sm:p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-200 placeholder-gray-400"
        />
        <input
          type="number"
          value={combatant.ac}
          onChange={(e) => onChange('ac', e.target.value)}
          placeholder="AC"
          className="bg-gray-700 border border-gray-600 p-1 sm:p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-200 placeholder-gray-400"
        />
        <input
          type="number"
          value={combatant.round}
          onChange={(e) => onChange('round', e.target.value)}
          placeholder="Round"
          className="bg-gray-700 border border-gray-600 p-1 sm:p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-200 placeholder-gray-400"
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-2 p-2 rounded hover:bg-gray-700 text-sm sm:text-base text-gray-200">
      <div className="truncate">{combatant.name}</div>
      <div>{combatant.hp}</div>
      <div>{combatant.ac}</div>
      <div>{combatant.round}</div>
    </div>
  );
};

const INITIAL_COMBATANT = {
  name: '',
  hp: '',
  ac: '',
  round: 1,
  id: null
};

const CombatTracker = () => {
  const [combatants, setCombatants] = useState([]);
  const [newRows, setNewRows] = useState([]);

  const handleNewRowChange = (index, field, value) => {
    setNewRows(prev => prev.map((row, i) => 
      i === index ? { ...row, [field]: value } : row
    ));
  };

  const handleAddRow = () => {
    const newRow = { ...INITIAL_COMBATANT, id: Date.now() };
    setNewRows(prev => [...prev, newRow]);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      const row = newRows[index];
      if (row.name && row.hp && row.ac) {
        setCombatants(prev => [...prev, row]);
        setNewRows(prev => prev.filter((_, i) => i !== index));
      }
    }
  };

  return (
    <div className="p-2 sm:p-4 bg-gray-900 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Combat Tracker Panel */}
        <div className="flex-1 bg-gray-800 rounded-lg shadow-lg p-3 sm:p-6 overflow-x-auto">
          <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-100">Combat Tracker</h1>
          
          <div className="mb-4 min-w-[600px] lg:min-w-0">
            <TableHeader />
            
            {/* Existing Combatants */}
            {combatants.map(combatant => (
              <CombatantRow 
                key={combatant.id} 
                combatant={combatant} 
                isNewRow={false}
              />
            ))}

            {/* New Row Forms */}
            {newRows.map((row, index) => (
              <div key={row.id} onKeyDown={(e) => handleKeyDown(e, index)}>
                <CombatantRow 
                  combatant={row}
                  isNewRow={true}
                  onChange={(field, value) => handleNewRowChange(index, field, value)}
                />
              </div>
            ))}

            <button
              onClick={handleAddRow}
              className="w-full mt-4 bg-gray-700 hover:bg-gray-600 text-gray-200 p-2 rounded transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <span>Add Row</span>
              <span>+</span>
            </button>
          </div>
        </div>

        {/* Character Details Panel */}
        <div className="w-full lg:w-96 bg-gray-800 rounded-lg shadow-lg p-3 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-100">Character Details</h2>
          <p className="text-gray-400 text-sm sm:text-base">
            This panel is TBD, but the idea is it shows the detailed stat blocks for the monster/players
          </p>
        </div>
      </div>
    </div>
  );
};

export default CombatTracker;