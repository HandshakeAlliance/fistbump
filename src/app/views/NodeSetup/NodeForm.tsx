import * as React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import { Redirect } from 'react-router-dom'
import { Input, Button } from '../../components'
import { path } from 'ramda'
import styled from 'styled-components'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`

const StyledInput = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: row no-wrap;
  background-color: #1c1c1c;
  border-radius: 0.40rem;
  margin: 0 0 15px;

  & input {
    width: 100%;
  }
`
interface LogoutProp {
  logout?: () => void
}

type OwnProps = LogoutProp & InjectedFormProps

const NodeForm = ({
  anyTouched,
  initialValues,
  handleSubmit,
  logout,
}: OwnProps) => {
  const nodeUrl = path(['nodeUrl'], initialValues)
  return (
    anyTouched && nodeUrl
      ? (<Redirect to="/wallet/overview" />)
      : (<>
          <Form onSubmit={handleSubmit}>
            <StyledInput>
              <Field
                name="nodeUrl"
                component={Input}
                type="text"
                placeholder="http://127.0.0.1:12039"
              />
            </StyledInput>
            <StyledInput>
              <Field
                name="apiKey"
                component={Input}
                type="text"
                placeholder="api key"
              />
            </StyledInput>
            <StyledInput>
              <Field
                name="walletId"
                component={Input}
                type="text"
                placeholder="wallet id (primary)"
              />
            </StyledInput>
            <Button type="submit" bt="primary">Submit</Button>
          </Form>
          {nodeUrl &&
            <Button bt="secondary" onClick={logout}>Logout</Button>}
        </>)
  )
}

export default reduxForm<LogoutProp>({
  form: 'NodeForm',
  enableReinitialize: true,
})(NodeForm)
