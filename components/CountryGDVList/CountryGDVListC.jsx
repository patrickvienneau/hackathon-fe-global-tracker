import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import converter from 'convert-string-to-number'
import CountryGDVList from './CountryGDVList'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import reduce from 'lodash/reduce'
import map from 'lodash/map'
import sortBy from 'lodash/sortBy'
import reverse from 'lodash/reverse'

const mapStateToProps = (state) => {
  const payments = get(state, 'paymentR')

  return {
    payments,
  }
}

class CountryGDVListC extends PureComponent {
  getCountryGDVSummaryList = () => {
    const { payments } = this.props

    const countryList = reduce(payments, (acc, payment) => {
      const senderCountryCode = get(payment, 'data.payer.isoCountryCode')
      const usdAmount = get(payment, 'data.usdAmount')

      if (!acc[senderCountryCode]) acc[senderCountryCode] = 0

      acc[senderCountryCode] = acc[senderCountryCode] + converter(usdAmount)

      return acc
    }, {})

    const countryListSummary = map(countryList, (amount, countryCode) => ({
      countryCode,
      amount,
    }))

    const countryListSummarySortedByAmount = reverse(sortBy(countryListSummary, 'amount'))

    return countryListSummarySortedByAmount
  }

  getTotalAmount = () => {
    const { payments } = this.props

    return reduce(payments, (acc, payment) => {
      const usdAmount = get(payment, 'data.usdAmount')

      return acc + converter(usdAmount)
    }, 0)
  }

  render () {
    const countryListSummary = this.getCountryGDVSummaryList()
    const usdAmount = this.getTotalAmount()

    return (
      <CountryGDVList
        countryListSummary={countryListSummary}
        totalAmount={usdAmount}
      />
    )
  }
}

CountryGDVListC.propTypes = {
  payments: PropTypes.array,
}

export default connect(mapStateToProps)(CountryGDVListC)
