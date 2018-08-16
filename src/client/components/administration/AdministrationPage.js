import React from 'react'
import intl from 'react-intl-universal'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Header, Menu,  MenuItem, Grid, GridRow } from 'semantic-ui-react'

import { withUser } from '../contexts/withUserContext'
import AdminPageMenu from './AdminPageMenu'
import AdminRoutes from './AdminRoutes'

const AdministrationPage = ( { match, userCtx }) => {
  return (
    <Grid columns={1} centered>
      <Grid.Row centered>
        <Header as ="h1">{intl.get("admin-page-title")}</Header>
      </Grid.Row>

      {/* {(!userCtx.isAuthenticated || userCtx.user.role != 'admin') && <Grid.Row centered textAlign="center">
        You are not authorised to view this page.
      </Grid.Row>}

      {(userCtx.isAuthenticated || userCtx.user.role === 'admin') && <Grid.Row centered>
          <Menu stackable pointing>
            <MenuItem as={NavLink} to={`${match.url}/country`} key="country" activeClassName="active"
                         compact="true">
                {intl.get("admin-country-menu-header")}
              </MenuItem>
          </Menu>
      </Grid.Row>} */}

       <GridRow centered>
        <AdminPageMenu match={match} />
      </GridRow>

      <GridRow centered>
        <AdminRoutes match={match} />
      </GridRow>
    </Grid>
  )
}

AdministrationPage.propTypes = {
  match: PropTypes.object.isRequired,
  userCtx: PropTypes.object
};

export default withUser(AdministrationPage);