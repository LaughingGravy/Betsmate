import React from 'react'
import PropTypes from 'prop-types'
import { Responsive, Form, Label, Icon, Container } from 'semantic-ui-react'

import { containerStyle, iconStyle, dropdownStyle } from './ValidationDropdownCss'
import ValidationErrorPopup from '../ValidationErrorPopup'

const ValidationDropdown = (props) => {
  const { errors, pristine, placeholder, label, onChange, onBlur, onCloseClick, name, key, options, defaultValue, search={search} } = props
  let objs = []

  if (errors)
    objs = errors.objs

  let isError = false
  // let errMessages = ""
  let firstErrMessage = ""

  if (objs && objs.length > 0) {
    isError = true
    firstErrMessage = objs[0].msg
  }

  const shouldDisplayError = !pristine && isError 

  return (
    <React.Fragment>
      {!shouldDisplayError && <Container style={containerStyle} fluid>
                                <Icon link style={iconStyle} name="close" onClick={onCloseClick} />
                                <Form.Dropdown name={name} key={key} fluid selection label={label}
                                                placeholder={placeholder} onChange={onChange} onBlur={onBlur}
                                                search={search} options={options} defaultValue={defaultValue}/>
                              </Container>}

      {shouldDisplayError && <Responsive minWidth={Responsive.onlyComputer.minWidth}>
        <Form.Select name={name} key={key} fluid selection clearable
                                              placeholder={placeholder} onChange={onChange} onBlur={onBlur}
                                              search={search} options={options} defaultValue={defaultValue}>
          <input />
          <ValidationErrorPopup message={firstErrMessage} />
        </Form.Select>  
      </Responsive>}

      {shouldDisplayError && <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>         
      <React.Fragment>
      <Form.Dropdown name={name} key={key} fluid selection clearable
                                              placeholder={placeholder} onChange={onChange} onBlur={onBlur}
                                              search={search} options={options} defaultValue={defaultValue} />
        <Label size="mini" basic color="red" basic pointing>{firstErrMessage}</Label>
        </React.Fragment>
      </Responsive>}
    </React.Fragment>
  )
}

ValidationDropdown.propTypes = {
  errors: PropTypes.shape({
    objs: PropTypes.arrayOf(PropTypes.shape({
      test: PropTypes.func.isRequired,
      msg: PropTypes.string.isRequired
    }))
  }),
  pristine: PropTypes.number.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  defaultValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func
}

export default ValidationDropdown
