import './Map.scss'
import React from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import LineC from './extensions/Line/LineC'
import PinC from './extensions/Pin/PinC'
import ZoomableGroupC from './extensions/ZoomableGroup/ZoomableGroupC'
import { GEO_TOPO_URL } from 'constants/geography'

const Map = () => (
  <ComposableMap
    className='Map'
    projectionConfig={{
      rotate: [-10, 0, 0],
      scale: 147,
    }}
  >
    <ZoomableGroupC>
      <Geographies
        geography={GEO_TOPO_URL}
        fill='#D6D6DA'
        stroke='#FFFFFF'
        strokeWidth={0.5}
      >
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>

      <LineC
        from={[2.3522, 48.8566]}
        to={[-74.006, 40.7128]}
        stroke="#FF5533"
        strokeWidth={1}
        strokeLinecap="round"
      />

      {/*<LineC
        from={[90.3522, -10.8566]}
        to={[-74.006, 40.7128]}
        stroke="#FF5533"
        strokeWidth={1}
        strokeLinecap="round"
      />*/}

      <PinC coordinates={[-120.006, 35.7128]} />
    </ZoomableGroupC>
  </ComposableMap>
)

export default Map
