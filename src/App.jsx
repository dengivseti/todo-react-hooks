import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {Home} from './pages/Home'
import {Faq} from './pages/Faq'
import { Navbar } from './components/Navbar';
import { Alert } from './components/Alert';
import { AlertState } from './context/Alert/AlertState';
import { TodoState } from './context/Todo/TodoState';

function App() {
  return (
    <TodoState>
      <AlertState>
        <BrowserRouter>
          <Navbar />
          <div className="container pt-4">
            <Alert />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/faq" component={Faq} />
            </Switch>
          </div>
        </BrowserRouter>
      </AlertState>
    </TodoState>
  );
}

export default App
