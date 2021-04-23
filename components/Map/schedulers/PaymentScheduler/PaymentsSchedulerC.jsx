import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PaymentScheduler from './PaymentScheduler'
import map from 'lodash/map'
import get from 'lodash/get'
import forEach from 'lodash/forEach'
import includes from 'lodash/includes'
import reject from 'lodash/reject'
import concat from 'lodash/concat'
import pull from 'lodash/pull'
import find from 'lodash/find'
import assign from 'lodash/assign'
import { DISPLAY_COOLDOWN_DURATION_MS } from 'constants/mapConstants'

const mapStateToProps = () => {
  return {
    payments: [
      { id: '1' },
    ],
  }
}

class PaymentSchedulerC extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      activePaymentIds: [],
    }
  }

  componentDidMount () {
    const { payments } = this.props

    // ONLY FOR DEV - REMOVE ONCE WE HAVE REAL DATA
    forEach(payments, payment => {
      const paymentId = get(payment, 'id')

      this.registerPayment(paymentId)
    })
  }

  componentDidUpdate (prevProps) {
    const { payments: nextPayments } = this.props
    const { payments: prevPayments } = prevProps

    const prevPaymentIds = map(prevPayments, 'id')

    const paymentsToRegister = reject(nextPayments, payment => {
      const paymentId = get(payment, 'id')

      return includes(prevPaymentIds, paymentId)
    })

    forEach(paymentsToRegister, paymentToRegister => {
      const paymentId = get(paymentToRegister, 'id')

      this.registerPayment(paymentId)
    })
  }

  registerPayment = (paymentId) => {
    this.setState(({ activePaymentIds: prevActivePaymentIds }) => ({
      activePaymentIds: concat(prevActivePaymentIds, paymentId),
    }), () => {
      setTimeout(() => {
        this.unregisterPayment(paymentId)
      }, DISPLAY_COOLDOWN_DURATION_MS)
    })
  }

  unregisterPayment = (paymentId) => {
    this.setState(({ activePaymentIds: prevActivePaymentIds }) => {
      const clonedPaymentsId = assign([], prevActivePaymentIds)

      return {
        activePaymentIds: pull(clonedPaymentsId, paymentId),
      }
    })
  }

  getActivePayments = () => {
    const { payments } = this.props
    const { activePaymentIds } = this.state

    const activePayments = map(activePaymentIds, activePaymentId => find(payments, { id: activePaymentId }))

    return activePayments
  }

  render () {
    const activePayments = this.getActivePayments()

    return (
      <PaymentScheduler
        {...this.props}
        payments={activePayments}
      />
    )
  }
}

PaymentSchedulerC.propTypes = {
  payments: PropTypes.array,
}

export default connect(mapStateToProps)(PaymentSchedulerC)
