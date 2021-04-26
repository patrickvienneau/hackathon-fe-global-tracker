import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import NewAccountList from './NewAccountList'
import size from 'lodash/size'
import get from 'lodash/get'
import reduce from 'lodash/reduce'
import map from 'lodash/map'
import reverse from 'lodash/reverse'
import sortBy from 'lodash/sortBy'

const mapStateToProps = (state) => {
  const accounts = get(state, 'accountR', [])

  return {
    accounts,
  }
}

class NewAccountListC extends PureComponent {
  getCountryGDVSummaryList = () => {
    const { accounts } = this.props

    const countryList = reduce(accounts, (acc, payment) => {
      const senderCountryCode = get(payment, 'data.isoCountryCode')

      if (!senderCountryCode) return acc

      if (!acc[senderCountryCode]) acc[senderCountryCode] = 0

      acc[senderCountryCode] = acc[senderCountryCode] + 1

      return acc
    }, {})

    const countryListSummary = map(countryList, (count, countryCode) => ({
      countryCode,
      count,
    }))

    const countryListSummarySortedByAmount = reverse(sortBy(countryListSummary, 'count'))

    return countryListSummarySortedByAmount
  }

  getTotalCount = () => {
    const { accounts } = this.props

    return size(accounts)
  }

  render () {
    const countryListSummary = this.getCountryGDVSummaryList()
    const totalCount = this.getTotalCount()

    return (
      <NewAccountList
        {...this.props}
        countryListSummary={countryListSummary}
        totalCount={totalCount}
      />
    )
  }
}

NewAccountListC.propTypes = {
  accounts: PropTypes.array,
}

export default connect(mapStateToProps)(NewAccountListC)
