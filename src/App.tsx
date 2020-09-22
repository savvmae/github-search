import React from 'react'
import { Route, Switch } from 'react-router-dom'
import GlobalStyles from './globalStyles'
import Search from './pages/Search'
import Detail from './pages/Detail'

function App() {
  return (
    <div>
      <GlobalStyles />
      <Switch>
        <Route path="/" component={Search} exact />
        <Route path="/detail" component={Detail} exact />
      </Switch>
    </div>
  )
}

export default App
