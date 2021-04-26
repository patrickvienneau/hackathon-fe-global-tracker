import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import NewAccountScheduler from './NewAccountScheduler'
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
    accounts: [
      { id: '1' },
    ],
  }
}

class NewAccountSchedulerC extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      activeAccountIds: [],
    }
  }

  componentDidMount () {
    const { accounts } = this.props

    // ONLY FOR DEV - REMOVE ONCE WE HAVE REAL DATA
    forEach(accounts, account => {
      const accountId = get(account, 'id')

      this.registerAccount(accountId)
    })
  }

  componentDidUpdate (prevProps) {
    const { accounts: nextAccounts } = this.props
    const { accounts: prevAccounts } = prevProps

    const prevAccountIds = map(prevAccounts, 'id')

    const accountsToRegister = reject(nextAccounts, account => {
      const accountId = get(account, 'id')

      return includes(prevAccountIds, accountId)
    })

    forEach(accountsToRegister, accountToRegister => {
      const accountId = get(accountToRegister, 'id')

      this.registerAccount(accountId)
    })
  }

  registerAccount = (accountId) => {
    this.setState(({ activeAccountIds: prevActiveAccountIds }) => ({
      activeAccountIds: concat(prevActiveAccountIds, accountId),
    }), () => {
      setTimeout(() => {
        this.unregisterAccount(accountId)
      }, DISPLAY_COOLDOWN_DURATION_MS)
    })
  }

  unregisterAccount = (accountId) => {
    this.setState(({ activeAccountIds: prevActiveAccountIds }) => {
      const clonedAccountsId = assign([], prevActiveAccountIds)

      return {
        activeAccountIds: pull(clonedAccountsId, accountId),
      }
    })
  }

  getActiveAccounts = () => {
    const { accounts } = this.props
    const { activeAccountIds } = this.state

    const activeAccounts = map(activeAccountIds, activeAccountId => find(accounts, { id: activeAccountId }))

    return activeAccounts
  }

  render () {
    const activeAccounts = this.getActiveAccounts()

    return (
      <NewAccountScheduler
        {...this.props}
        accounts={activeAccounts}
      />
    )
  }
}

NewAccountSchedulerC.propTypes = {
  accounts: PropTypes.array,
}

export default connect(mapStateToProps)(NewAccountSchedulerC)
