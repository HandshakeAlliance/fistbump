import * as React from 'react';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { fetchNameInfo } from '../store/actions'
import styled from 'styled-components'
import { SearchInput } from '.'
import { useHistory } from 'react-router'

const Container = styled.div`
  width: 50vw;
`

interface MapDispatchType {
  handleSubmit: any;
}

const SearchBar = ({ handleSubmit }: MapDispatchType) => {
  const history = useHistory()

  function handleSubmition(e: any) {
    e.preventDefault()
    handleSubmit()
    history.push('/tld/search')
  }

  return (
    <Container>
      <form onSubmit={handleSubmition}>
        <Field
          name="searchName"
          type="text"
          component={SearchInput}
          normalize={(n: string) => n.replace(' ', '')}
          placeholder="Search for a TLD"
        />
      </form>
    </Container>
  )
}

const mapDispatchToProps = (dispatch: any) => ({
  handleSubmit: () => {
    dispatch(fetchNameInfo())
  },
})

export default reduxForm({
  form: 'NameSearch',
})(connect(null, mapDispatchToProps)(SearchBar))
