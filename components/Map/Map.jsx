import './Map.scss'
import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { ComposableMap, Geographies, Geography, Graticule } from 'react-simple-maps'
import LineC from './extensions/Line/LineC'
import PinC from './extensions/Pin/PinC'
import { GEO_TOPO_URL } from 'constants/geography'

const Map = forwardRef(({
  xOffset = 0,
  yOffset = 0,
  isGlobe = false,
  ...props
}, ref) => (
  <div
    {...props}
    className='Map'
    ref={ref}
  >
    <ComposableMap
      className='Map'
      projection={isGlobe ? 'geoOrthographic' : undefined}
      projectionConfig={{
        rotate: [xOffset, yOffset, 0],
        scale: 200,
      }}
    >
      <Graticule stroke="#DDD" />

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

      <LineC
        from={[90.3522, -10.8566]}
        to={[-74.006, 40.7128]}
        stroke="#FF5533"
        strokeWidth={1}
        strokeLinecap="round"
      />

      <PinC coordinates={[-120.006, 35.7128]} />
    </ComposableMap>
  </div>
))

Map.propTypes = {
  xOffset: PropTypes.number,
  yOffset: PropTypes.number,
  isGlobe: PropTypes.bool,
}

export default Map
