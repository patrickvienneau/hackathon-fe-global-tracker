import './PaymentScheduler.scss'
import React from 'react'
import PropTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import PaymentMarkerC from 'components/Map/components/PaymentMarker/PaymentMarkerC'
import map from 'lodash/map'
import get from 'lodash/get'

const PaymentScheduler = ({
  payments = [],
}) => (
  <g className='PaymentScheduler'>
    <TransitionGroup
      component='g'
    >
      {
        map(payments, (payment, ii) => {
          const fromLat = get(payment, 'geocoding.payerLatLng.lat')
          const fromLng = get(payment, 'geocoding.payerLatLng.lng')
          const toLat = get(payment, 'geocoding.payeeLatLng.lat')
          const toLng = get(payment, 'geocoding.payeeLatLng.lng')

          return (
            <CSSTransition
              key={ii}
              in={true}
              timeout={5000}
              classNames='schedulerFade'
              unmountOnExit
            >
              <PaymentMarkerC
                fromCoordinates={[fromLng, fromLat]}
                toCoordinates={[toLng, toLat]}
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
}

export default PaymentScheduler
