
import React from 'react';
import intl from 'react-intl-universal'
import { Form, Container } from 'semantic-ui-react'
import EditCountrySaveButton from './EditCountrySaveButton'

const CountryForm = ({ handleChange, code, countryName }) => {
  return (
    <Form className='segment' onSubmit={e => e.preventDefault }>
      <Form.Field required>
        <Form.Input name='code' value={code} label={intl.get("country-code-label")} 
                placeholder={intl.get("country-code-placeholder")} onChange={handleChange} />
      </Form.Field>

      <Form.Field required>
        <Form.Input name='countryName' value={countryName} label={intl.get("country-name-label")} 
                placeholder={intl.get("country-name-placeholder")} onChange={handleChange} />
      </Form.Field>

      <Container textAlign='center'>
        <EditCountrySaveButton code={code} countryName={countryName} />
      </Container>
    </Form>
  )
}

export default CountryForm