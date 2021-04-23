import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import LineC from 'components/Map/extensions/Line/LineC'
import map from 'lodash/map'

const PaymentScheduler = ({
  payments = [],
}) => (
  <Fragment>
    {
      map(payments, (payment) => (
        <LineC
          from={[2.3522, 48.8566]}
          to={[-74.006, 40.7128]}
          stroke="#FF5533"
          strokeWidth={1}
          strokeLinecap="round"
        />
      ))
    }
  </Fragment>
)

PaymentScheduler.propTypes = {
  payments: PropTypes.array,
}

export default PaymentScheduler
