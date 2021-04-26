import './App.scss'
import React from 'react'
import PropTypes from 'prop-types'
import className from 'classnames'
import MapC from 'components/Map/MapC'

const App = ({
  shouldRender = true,
}) => (
  <div className={className('App', { shouldRender })}>
    <MapC isGlobe />
  </div>
)

App.propTypes = {
  shouldRender: PropTypes.bool,
}

export default App
