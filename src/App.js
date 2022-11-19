import './App.css';
import Login from "./Login";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './Register';
import Homepage from './HomePage';
function App() {
  return (
    <Router>
      <div className="App">
          <div className="content">
            <Switch>
              <Route exact path="/">
                <Login />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/register">
                <Register/>
              </Route>
              <Route exact path="/homepage">
                <Homepage/>
              </Route>
            </Switch>
          </div>
      </div>
    </Router>
  );
}

export default App;
