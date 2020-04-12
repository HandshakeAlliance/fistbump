import * as React from 'react';
import { connect } from 'react-redux'
import { isEmpty } from 'ramda'
import { fetchSavedNames, NodeDataType } from '../../store/actions'
import { GlobalStateType } from '../../store/reducers'
import styled from 'styled-components'
import { CheckSquare, XSquare } from 'styled-icons/feather'

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: scroll;
  transform: translateX(-20px);
  width: 100vw;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: solid rgba(255, 255, 255, .1);
  border-width: 0 0 1px;
  padding: 10px 20px;

  & svg {
    transform: translateY(-2px);
  }
`

interface MapDispatchType {
  fetchSavedNames: any;
}

interface MapStateTypes {
  savedNames: [any];
  nodeData: NodeDataType;
}

type OwnProps = MapDispatchType & MapStateTypes

const Watching = ({
  fetchSavedNames,
  savedNames,
  nodeData,
}: OwnProps) => {
  React.useEffect(() => {
    fetchSavedNames()
  }, [])

  return (
    <Container>
      {!isEmpty(savedNames) && savedNames.map(name => {
          const nameBlock = name.start.start
          const started = nameBlock < nodeData.chain.height

          return (
            <Row key={name._fbName}>
              <p>{name._fbName}/</p>
              <p title="Release Block">
                {name.start.start}
                {' '}
                {
                  started
                    ? <CheckSquare title="Start block has passed" size={15} />
                    : <XSquare title="Start block not yet reached" size={15} />
                }
              </p>
            </Row>
          )
        })}
    </Container>
  )
}

const mapStateToProps = (state: GlobalStateType) => ({
  savedNames: state.savedNames,
  nodeData: state.nodeData,
})

const mapDispatchToProps = (dispatch: any) => ({
  fetchSavedNames: () => {
    dispatch(fetchSavedNames())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Watching)
