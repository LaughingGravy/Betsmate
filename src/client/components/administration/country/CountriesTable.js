import React from 'react'
import { Query } from 'react-apollo'
import { Table } from 'semantic-ui-react'
import { compose } from 'recompose'

import { history } from '../../../../../library/routing'

import ALL_COUNTRIES from '../../../graphql/queries/administration/country/allCountries'
import { LoadingDisplay, renderForLoading, renderForError, QueryErrorDisplay, renderForDataNotFound, NotFoundDisplay } from '../../common/ConditionalRender'

import CountriesTableHeader from './CountriesTableHeader'
import CountriesTableFooter from './CountriesTableFooter'
import CountriesRow from './CountriesRow'
import { withSelectableRowsTable } from '../../common/withSelectableRowsTable'

const vanillaCountriesTable = ({ data: {countries}, activeRows, onRowClick }) => {
  let code = ""
  // const anySelectedRows = Object.entries(activeRows).some(e => e[1] == true)

  // if (anySelectedRows)
  code = Object.entries(activeRows).shift()[0] 

  return (
    <Table celled selectable stackable>
      
      <CountriesTableHeader />

      <Table.Body>
        {
          countries.map(c => {
          const isActive = activeRows[c.code]
          
          return(<CountriesRow active={isActive} 
                                key={c.code}
                                id={c.code}
                                data={c}
                                onRowClick={onRowClick}
                                />      
            )
          }
        )}
      </Table.Body>

      <CountriesTableFooter activeRows={activeRows} />
      
    </Table>
  )
}

const EnhancedCountriesTable = compose(
  renderForLoading(LoadingDisplay),
  renderForError(QueryErrorDisplay),
  renderForDataNotFound(NotFoundDisplay, "countries")
)(withSelectableRowsTable(vanillaCountriesTable))

const CountriesTable = () => {
  return (
  <Query query={ALL_COUNTRIES}>
    {EnhancedCountriesTable}
  </Query>
  )
}

export default CountriesTable