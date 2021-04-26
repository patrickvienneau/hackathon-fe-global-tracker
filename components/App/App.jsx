import './App.scss'
import React from 'react'
import PropTypes from 'prop-types'
import className from 'classnames'
import MapC from 'components/Map/MapC'
import CountryGDVListC from 'components/CountryGDVList/CountryGDVListC'
import NewAccountListC from 'components/NewAccountList/NewAccountListC'

const App = ({
  shouldRender = true,
}) => (
  <div className={className('App', { shouldRender })}>
    <div className='dashboard'>
      <CountryGDVListC />

      <NewAccountListC />
    </div>

    <div className='mapContainer'>
      <MapC isGlobe />
    </div>
  </div>
)

App.propTypes = {
  shouldRender: PropTypes.bool,
}

export default App
