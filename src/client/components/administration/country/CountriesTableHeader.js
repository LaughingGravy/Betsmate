import React from 'react'
import { Table } from 'semantic-ui-react'
import intl from 'react-intl-universal'

const CountriesTableHeader = () => {
  return (
    <Table.Header>
      <Table.Row textAlign='center'>
        <Table.HeaderCell>{intl.get("country-tbl-code-col-hdr")}</Table.HeaderCell>
        <Table.HeaderCell>{intl.get("country-tbl-flag-col-hdr")}</Table.HeaderCell>
        <Table.HeaderCell>{intl.get("country-tbl-name-col-hdr")}</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  )
}

export default CountriesTableHeader