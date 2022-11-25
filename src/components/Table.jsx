/** @format */

import React from "react"
import numeral from "numeral"

const Table = ({ countries }) => {
  return (
    <div className="table overflow-y-scroll h-98">
      {countries.map((country, key) => (
        <tr key={key}>
          <td>{country.country}</td>
          <td>
            <strong>{numeral(country.cases).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </div>
  )
}

export default Table
