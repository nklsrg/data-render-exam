import React, { useState } from 'react';

function FilterCafes({ onFilterChange }) {
  const [subway, setSubway] = useState('All');

  const subways = [
    { name: 'Все', code: 'All' },
    { name: 'Арбатская', code: 'Arbat' },
    { name: 'Александровский сад', code: 'Alexanders Garden' },
    { name: 'Московская', code: 'Moscow' },
    { name: 'Парк Культуры', code: 'Culture' },
    { name: 'Театральная', code: 'Theater' },
  ];

  const handleOptionChange = (e) => {
    const code = e.target.value;
    setSubway(code);

    if (typeof onFilterChange === 'function') {
      onFilterChange(code);
    }
  };

  return (
    <div className="controls">
      <select id="subwaySelect" value={subway} onChange={handleOptionChange}>
        {subways.map(option => (
          <option key={option.code} value={option.code}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterCafes;

