import React from 'react';
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { Container, Button } from 'semantic-ui-react'

import { renderMessageForError } from './ConditionalRender'
import GraphQLErrorDisplay from './GraphQLErrorDisplay'

const EnhancedGraphQLErrorDisplay = compose(
  renderMessageForError(GraphQLErrorDisplay)
)(GraphQLErrorDisplay)

const MutationButton = ({variables, mutation, loading, error, label }) => {
  return (
    <Container textAlign="center">
        <EnhancedGraphQLErrorDisplay error={error} />
        <Button primary
                      onClick={e => { 
                                      e.preventDefault();
                                      mutation({variables})
                      }}
                      loading={loading} 
                    >{intl.get(label)}
        </Button>  
    </Container>
  )
}

MutationButton.propTypes = {
  variables: PropTypes.object.isRequired,
  mutation: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  label: PropTypes.string.isRequired
};

export default MutationButton