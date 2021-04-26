import './NewAccountScheduler.scss'
import React from 'react'
import PropTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import AccountMarker from 'components/Map/components/AccountMarker/AccountMarker'
import map from 'lodash/map'
import get from 'lodash/get'

const NewAccountScheduler = ({
  accounts = [],
}) => (
  <g className='NewAccountScheduler'>
    <TransitionGroup
      component='g'
    >
      {
        map(accounts, (account, ii) => {
          const lat = get(account, 'geocoding.accountLatLng.lat')
          const lng = get(account, 'geocoding.accountLatLng.lng')

          return (
            <CSSTransition
              key={ii}
              in={true}
              timeout={5000}
              classNames='schedulerFade'
              unmountOnExit
            >
              <AccountMarker coordinates={[lng, lat]} />
            </CSSTransition>
          )
        })
      }
    </TransitionGroup>
  </g>
)

NewAccountScheduler.propTypes = {
  accounts: PropTypes.array,
}

export default NewAccountScheduler
