import React, { useEffect, useState } from 'react';
import FilterCafes from './FilterCafes';

const CafesTable = () => {
  const [allCafes, setAllCafes] = useState([]);
  const [visibleCafes, setVisibleCafes] = useState([]);
  const [subwayFilter, setSubwayFilter] = useState('All');
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/cafes');
        const json = await res.json();
        const list = json.cafes ? json.cafes : json;
        setAllCafes(list);
        setVisibleCafes(list);
      } catch (err) {
        console.error('Ошибка получения списка кафе:', err);
      } finally {
        setIsFetching(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (subwayFilter === 'All') {
      setVisibleCafes(allCafes);
    } else {
      setVisibleCafes(allCafes.filter(item => item.subwayCode === subwayFilter));
    }
  }, [subwayFilter, allCafes]);

  const updateSubwayFilter = (code) => setSubwayFilter(code);

  if (isFetching) {
    return (
      <section className="container m-3" id="container">
        <div className="cafesTable">Загрузка...</div>
      </section>
    );
  }

  return (
    <section className="container m-3" id="container">
      <div className="cafesTable">
        <FilterCafes onFilterChange={updateSubwayFilter} />
        <ul className="cardsList">
          {visibleCafes.map(cafe => (
            <li className="card" key={cafe.id}>
              <div className="card-image">
                <img
                  src={cafe.img ? cafe.img : 'https://via.placeholder.com/150'}
                  alt={cafe.name || 'Cafe'}
                  width={150}
                  height={150}
                />
              </div>
              <div className="card-body">
                <h3>{cafe.name}</h3>
                <span className="desc">{cafe.desc}</span>
                <div className="info">
                  <span>{cafe.address}</span>
                  <span>Метро: {cafe.subwayCode}</span>
                  <span>{cafe.workTime}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CafesTable;

