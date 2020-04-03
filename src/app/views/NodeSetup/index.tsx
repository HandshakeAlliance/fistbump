import * as React from 'react';
import { connect } from 'react-redux'
import NodeForm from './NodeForm'
import styled from 'styled-components'
import { selectNodeData, logout } from '../../store/actions'

interface mapStateTypes {
  initialValues?: any;
}
interface mapDispatchType {
  onSubmit: (values: any) => void;
  logout: () => void;
}

type OwnProps = mapStateTypes & mapDispatchType

const NodeFormContainer = styled.div`
  margin: 10px 20px;
`

const NodeSetup = (props: OwnProps) => (
  <NodeFormContainer>
    <NodeForm {...props} />
  </NodeFormContainer>
)

const mapStateToProps = (state: any) => ({
  initialValues: state.settings,
})

const mapDispatchToProps = (dispatch: any) => ({
  onSubmit: () => {
    dispatch(selectNodeData())
  },
  logout: () => {
    dispatch(logout())
  }
})

export default connect<mapStateTypes, mapDispatchType>(mapStateToProps, mapDispatchToProps)(NodeSetup)
