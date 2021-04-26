import './PaymentScheduler.scss'
import React from 'react'
import PropTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import PaymentMarkerC from 'components/Map/components/PaymentMarker/PaymentMarkerC'
import map from 'lodash/map'
import get from 'lodash/get'
import noop from 'lodash/noop'

const PaymentScheduler = ({
  payments = [],
  handlePaymentMarketAnimationComplete = noop,
}) => (
  <g className='PaymentScheduler'>
    <TransitionGroup
      component='g'
    >
      {
        map(payments, (payment) => {
          const fromLat = get(payment, 'geocoding.payerLatLng.lat')
          const fromLng = get(payment, 'geocoding.payerLatLng.lng')
          const toLat = get(payment, 'geocoding.payeeLatLng.lat')
          const toLng = get(payment, 'geocoding.payeeLatLng.lng')
          const id = get(payment, 'id')

          return (
            <CSSTransition
              key={id}
              in={true}
              timeout={5000}
              classNames='schedulerFade'
              unmountOnExit
            >
              <PaymentMarkerC
                fromCoordinates={[fromLng, fromLat]}
                toCoordinates={[toLng, toLat]}
                onAnimationComplete={() => handlePaymentMarketAnimationComplete(id)}
              />
            </CSSTransition>
          )
        })
      }
    </TransitionGroup>
  </g>
)

PaymentScheduler.propTypes = {
  payments: PropTypes.array,
  handlePaymentMarketAnimationComplete: PropTypes.func,
}

export default PaymentScheduler
