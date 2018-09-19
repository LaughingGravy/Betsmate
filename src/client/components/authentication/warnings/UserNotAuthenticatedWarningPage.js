import React from 'react'
import intl from 'react-intl-universal'
import { Grid, GridColumn, Message, Icon } from 'semantic-ui-react'

const UserNotAuthenticatedWarningPage = () => (
  <Grid columns={1} centered>
    <Grid.Row centered>
      <GridColumn mobile={14} tablet={8} computer={6}>
        <Message size="big" warning>
          
          <Message.Header>
            <Icon name="warning" size="large" />{intl.get("user_not_loggedin-warning-page-title")}
          </Message.Header>
          <br />
          <Message.Content>
            {intl.getHTML("user_not_loggedin-message-error")}
          </Message.Content>
        </Message>
      </GridColumn>
    </Grid.Row>
  </Grid>
)

export default UserNotAuthenticatedWarningPage