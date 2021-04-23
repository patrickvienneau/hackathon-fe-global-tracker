import React from 'react'
import { GEO_TOPO_URL } from 'constants/geography'

import {
  ComposableMap,
  Geographies,
  Geography,
  Annotation,
} from 'react-simple-maps'

const Map = () => (
  <ComposableMap
    projection='geoAzimuthalEqualArea'
    projectionConfig={{
      rotate: [-20.0, -52.0, 0],
      scale: 700,
    }}
  >
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
    <Annotation
      subject={[2.3522, 48.8566]}
      dx={-90}
      dy={-30}
      connectorProps={{
        stroke: '#FF5533',
        strokeWidth: 3,
        strokeLinecap: 'round',
      }}
    >
      <text x='-8' textAnchor='end' alignmentBaseline='middle' fill='#F53'>
        Paris
      </text>
    </Annotation>
  </ComposableMap>
)

export default Map
