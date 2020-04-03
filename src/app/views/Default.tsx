import * as React from 'react';
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { NodeInfoType } from '../store/actions'
import { isNil, isEmpty } from 'ramda'

interface mapStateTypes {
  settings?: NodeInfoType;
}

type OwnProps = mapStateTypes

const Default = ({ settings }: OwnProps) => {
  return (
    <>
      {!isNil(settings) && !isEmpty(settings)
        ? (
          <Redirect push to="/wallet/overview" />
        )
        : (
          <Redirect push to="/splash" />
        )
      }
    </>
  )
}

const mapStateToProps = (state: any) => ({
  settings: state.settings,
})

export default connect(mapStateToProps)(Default)
