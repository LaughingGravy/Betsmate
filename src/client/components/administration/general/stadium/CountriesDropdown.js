import React from 'react'
import { Query } from 'react-apollo'
import { compose } from 'recompose'
import { Flag } from 'semantic-ui-react'

import { renderForLoading, renderForError, LoadingDisplay, QueryErrorDisplay } from '../../../common/ConditionalRender'

import ALL_COUNTRIES from '../../../../graphql/queries/administration/country/allCountries'

import ValidationDropdown from '../../../common/controls/ValidationDropdown'

const vanillaValidationDropdown  = (props) => {
  return (
    <ValidationDropdown {...props} />
  )
}

const EnhancedValidationDropdown = compose(
  renderForLoading(LoadingDisplay),
  renderForError(QueryErrorDisplay)
)(vanillaValidationDropdown)

const CountriesDropdown = (props) => {

  const getOptions = (data) => {
    if (!data || !data.countries) return [];

    const { countries } = data

    const options = countries.map(item => ({key: `${item.code}`, value: `${item.code}`, searchtext: `${item.name}`, text: <span><Flag name={item.code} />{item.name}</span>}))
    //const options = countries.map(item => ({key: `${item.code}`, value: `${item.code}`, text: `${item.name}`}))
    
    return options;
  }

  const searchQuery = (options, query) => {
    const re = new RegExp(query.toLowerCase())
    return options.filter(opt => re.test(opt.searchtext.toLowerCase()))
  }

  return (
    <Query query={ALL_COUNTRIES}>
    {({ loading, error, data }) => { 

      const options = getOptions(data)

      return (
        <EnhancedValidationDropdown {...props} options={options} search={searchQuery} loading={loading} error={error} />
      )
    }}
    </Query>
  )
}

export default CountriesDropdown