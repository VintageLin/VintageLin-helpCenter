import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import routerMap from './router'
import './assets/css/App.less';


function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          { routerMap.map((value, index) => <Route key={ value.name } path={ value.path } exact={ value.exact } component={ value.component } />) }
        </Switch>
      </Router>
    </div>
  );
}

export default App;
