import './NewAccountScheduler.scss'
import React from 'react'
import PropTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import AccountMarker from 'components/Map/components/AccountMarker/AccountMarker'
import map from 'lodash/map'

const NewAccountScheduler = ({
  payments = [],
}) => (
  <g className='NewAccountScheduler'>
    <TransitionGroup
      component='g'
    >
      {
        map(payments, (payment, ii) => (
          <CSSTransition
            key={ii}
            in={true}
            timeout={5000}
            classNames='schedulerFade'
            unmountOnExit
          >
            <AccountMarker />
          </CSSTransition>
        ))
      }
    </TransitionGroup>
  </g>
)

NewAccountScheduler.propTypes = {
  payments: PropTypes.array,
}

export default NewAccountScheduler
