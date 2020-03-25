import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
// pages
import { SignIn, SignUp, Profile, NewIncident } from './pages'

export default function Routes() {
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/register" component={SignUp} />

        <Route exact path="/profile" component={Profile} />
        <Route exact path="/incidents/new" component={NewIncident} />
      </Switch>
    </BrowserRouter>
  )
}
