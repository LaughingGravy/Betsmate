import React from 'react'
import { Query } from 'react-apollo'
import { Table } from 'semantic-ui-react'
import { compose } from 'recompose'

import ALL_STADIA from '../../../../graphql/queries/administration/stadium/allStadia'
import { LoadingDisplay, renderForLoading, renderForError, QueryErrorDisplay} from '../../../common/ConditionalRender'

import StadiaTableHeader from './StadiaTableHeader'
import StadiaTableFooter from './StadiaTableFooter'
import StadiaRow from './StadiaRow'
import { withSelectableRowsTable } from '../../../common/withSelectableRowsTable'

 const vanillaStadiaTable = ({ data: { stadia }, activeRows, onRowClick }) => {
  let id = 0;
  
  if (Object.entries(activeRows) && Object.entries(activeRows).some(e => e[1] == true))
    stadiumId = Object.entries(activeRows).shift()[0]

  return (
    <Table celled selectable stackable>
      
      <StadiaTableHeader />

      <Table.Body>
        {
          stadia.map(s => {
          const isActive = activeRows[s.id]
          
          return(<StadiaRow active={isActive} 
                                key={s.stadiumId}
                                id={s.stadiumId}
                                data={s}
                                onRowClick={onRowClick}
                                />      
            )
          }
        )}
      </Table.Body>

      <StadiaTableFooter activeRows={activeRows} />
      
    </Table>
  )
}

const EnhancedStadiaTable = compose(
  renderForLoading(LoadingDisplay),
  renderForError(QueryErrorDisplay)
)(withSelectableRowsTable(vanillaStadiaTable))

const StadiaTable = () => {
  return (
    <Query query={ALL_STADIA}>
       {({ loading, error, data }) => { 
         return (
           <EnhancedStadiaTable data={data} loading={loading} error={error} /> 
         )
       }}
    </Query>
  )
}

export default StadiaTable