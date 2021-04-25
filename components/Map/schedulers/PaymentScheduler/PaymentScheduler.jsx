import './PaymentScheduler.scss'
import React from 'react'
import PropTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import PaymentMarkerC from 'components/Map/components/PaymentMarker/PaymentMarkerC'
import map from 'lodash/map'

const PaymentScheduler = ({
  payments = [],
}) => (
  <g className='PaymentScheduler'>
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
            <PaymentMarkerC />
          </CSSTransition>
        ))
      }
    </TransitionGroup>
  </g>
)

PaymentScheduler.propTypes = {
  payments: PropTypes.array,
}

export default PaymentScheduler
