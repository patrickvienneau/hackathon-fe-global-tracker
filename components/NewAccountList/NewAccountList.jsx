import './NewAccountList.scss'
import React from 'react'
import PropTypes from 'prop-types'
import { getName } from 'country-list'
import map from 'lodash/map'

const NewAccountList = ({
  countryListSummary = [],
  totalCount = 0,
}) => (
  <div className='NewAccountList'>
    <h3>GDV Statistics</h3>

    <ul>
      {
        map(countryListSummary, ({ countryCode, count }) => (
          <li key={countryCode}>
            <label>
              <span className='countryName'>{getName(countryCode)}</span>

              <span className='amount'>{count}</span>
            </label>

            {
              totalCount && (
                  <div className='bar' style={{ width: `${count / totalCount * 100}%` }} />
              )
            }
          </li>
        ))
      }
    </ul>
  </div>
)

NewAccountList.propTypes = {
  countryListSummary: PropTypes.array,
  totalCount: PropTypes.number,
}

export default NewAccountList
