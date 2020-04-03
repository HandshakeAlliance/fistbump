import * as React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

interface MapStateType {
  settings: { user: string };
}

type OwnProps = MapStateType

const Settings = ({ settings }: OwnProps) => (
  <>
    <Link to="/splash">Splashing</Link>
    <p>User is {settings.user}</p>
  </>
)

const mapStateToProps = (state: MapStateType) => ({
  settings: state.settings,
})

export default connect(mapStateToProps)(Settings)
