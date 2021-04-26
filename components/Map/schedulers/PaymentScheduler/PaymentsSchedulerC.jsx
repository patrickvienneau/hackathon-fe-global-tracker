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

const mapStateToProps = (state) => {
  const payments = get(state, 'paymentR', [])

  return {
    payments,
  }
}

class PaymentSchedulerC extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      registeredPaymentIds: [],
      activePaymentIds: [],
    }
  }

  componentDidUpdate () {
    const { payments: nextPayments } = this.props
    const { registeredPaymentIds: prevRegisteredPaymentIds } = this.state

    const paymentsToRegister = reject(nextPayments, payment => {
      const paymentId = get(payment, 'id')

      return includes(prevRegisteredPaymentIds, paymentId)
    })

    forEach(paymentsToRegister, paymentToRegister => {
      const paymentId = get(paymentToRegister, 'id')

      this.registerPayment(paymentId)
    })
  }

  componentWillUnmount () {
    clearTimeout(this.unregisterTimeout)
  }

  registerPayment = (paymentId) => {
    this.setState(({ registeredPaymentIds: prevRegisteredPaymentIds, activePaymentIds: prevActivePaymentIds }) => ({
      registeredPaymentIds: concat(prevRegisteredPaymentIds, paymentId),
      activePaymentIds: concat(prevActivePaymentIds, paymentId),
    }), () => {
      this.unregisterTimeout = setTimeout(() => {
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
