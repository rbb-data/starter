/* global fetch */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Map from 'components/_shared/Map/Map';
import MapElements from './MapElements/MapElements';
import SearchWrapper from './SearchWrapper/SearchWrapper';
import Detail from './Detail/Detail';
import _ from './App.module.scss';

function App(props) {
  const { basePath } = useRouter();

  const [markers, setMarkers] = useState(null);
  const [selectedMarkerId, setSelectedMarkerId] = useState('0');

  useEffect(() => {
    async function fetchMarkers() {
      const res = await fetch(`${basePath}/markers.geo.json`);
      const json = await res.json();
      setMarkers(json.features);
    }

    fetchMarkers();
  }, []);
  // ⬆️ the second parameter to useEffect are its dependencies
  //  if the array is empty it runs only once otherwise it runs when dependencies change

  return (
    <div className={_.app}>
      <Detail
        className={_.detail}
        markers={markers}
        selectedMarkerId={selectedMarkerId}
        onSelectMarkerId={setSelectedMarkerId}
      />
      <div className={_.mapWrapper}>
        <Map bingKey={process.env.NEXT_PUBLIC_BING_KEY} className={_.map}>
          <MapElements
            markers={markers}
            onSelectMarkerId={setSelectedMarkerId}
            selectedMarkerId={selectedMarkerId}
          />
          <SearchWrapper
            markers={markers}
            onSelectMarkerId={setSelectedMarkerId}
          />
        </Map>
      </div>
    </div>
  );
}

export default App;
