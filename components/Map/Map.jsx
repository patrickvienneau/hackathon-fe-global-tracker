import './Map.scss'
import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { ComposableMap, Geographies, Geography, Graticule } from 'react-simple-maps'
import NewAccountSchedulerC from 'components/Map/schedulers/NewAccountScheduler/NewAccountSchedulerC'
import PaymentSchedulerC from 'components/Map/schedulers/PaymentScheduler/PaymentsSchedulerC'
import { GEO_TOPO_URL } from 'constants/geography'

const Map = forwardRef(({
  xOffset = 0,
  yOffset = 0,
  isGlobe = false,
  scale = 200,
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
        scale,
      }}
    >
      <Graticule className='grid' />

      <Geographies
        className='geographies'
        geography={GEO_TOPO_URL}
        stroke='#FFFFFF'
        strokeWidth={0.5}
      >
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              className='geography'
              key={geo.rsmKey}
              geography={geo}
            />
          ))
        }
      </Geographies>

      <PaymentSchedulerC />

      <NewAccountSchedulerC />
    </ComposableMap>
  </div>
))

Map.propTypes = {
  xOffset: PropTypes.number,
  yOffset: PropTypes.number,
  isGlobe: PropTypes.bool,
  scale: PropTypes.number,
}

export default Map
