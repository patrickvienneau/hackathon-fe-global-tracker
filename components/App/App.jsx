import './App.scss'
import React from 'react'
import PropTypes from 'prop-types'
import className from 'classnames'
import MapC from 'components/Map/MapC'
import CountryGDVListC from 'components/CountryGDVList/CountryGDVListC'
import NewAccountListC from 'components/NewAccountList/NewAccountListC'
import Logo from 'components/Logo/Logo'

const App = ({
  shouldRender = true,
}) => (
  <div className={className('App', { shouldRender })}>
    <div className='dashboard'>
      <Logo />

      <CountryGDVListC />

      <NewAccountListC />
    </div>

    <div className='mapContainer'>
      <MapC
        isGlobe
        isChoropleth
      />
    </div>
  </div>
)

App.propTypes = {
  shouldRender: PropTypes.bool,
}

export default App
