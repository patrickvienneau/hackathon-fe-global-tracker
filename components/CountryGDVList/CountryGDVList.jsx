import './CountryGDVList.scss'
import React from 'react'
import PropTypes from 'prop-types'
import currencyFormatter from 'currency-formatter'
import { getName } from 'country-list'
import map from 'lodash/map'

const CountryGDVList = ({
  countryListSummary = [],
  totalAmount = null,
}) => (
  <div className='CountryGDVList'>
    <h3>GDV Statistics</h3>

    <ul>
      {
        map(countryListSummary, ({ countryCode, amount }) => (
          <li key={countryCode}>
            <label>
              <span className='countryName'>{getName(countryCode)}</span>

              <span className='amount'>{currencyFormatter.format(amount, { code: 'USD' })}</span>
            </label>

            {
              totalAmount && (
                  <div className='bar' style={{ width: `${amount / totalAmount * 100}%` }} />
              )
            }
          </li>
        ))
      }
    </ul>
  </div>
)

CountryGDVList.propTypes = {
  countryListSummary: PropTypes.array,
  totalAmount: PropTypes.number,
}

export default CountryGDVList
