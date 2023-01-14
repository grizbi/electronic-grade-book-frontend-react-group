import "./App.css";
import Login from "./Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./Register";
import Homepage from "./HomePage";
import Students from "./Students";
import UpdateStudent from "./UpdateStudent";
import Charts from "./Charts";
import News from "./News";
import Messages from "./Messages";
import StudentsList from "./StudentsList";
import StudentCharts from "./StudentCharts";
import Notifications from "./Notifications";
import StudentNews from "./StudentNews";
import Calculator from "./Calculator";
import CalculatorStudent from "./CalculatorStudent";
import PredictedGrades from "./PredictedGrades";

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
              <Register />
            </Route>
            <Route exact path="/homepage">
              <Homepage />
            </Route>
            <Route exact path="/students">
              <Students />
            </Route>
            <Route exact path="/studentslist">
              <StudentsList />
            </Route>
            <Route exact path="/studentcharts">
              <StudentCharts />
            </Route>
            <Route exact path="/notifications">
              <Notifications />
            </Route>
            <Route exact path="/student-update">
              <UpdateStudent />
            </Route>
            <Route exact path="/charts">
              <Charts />
            </Route>
            <Route exact path="/news">
              <News />
            </Route>
            <Route exact path="/messages">
              <Messages />
            </Route>
            <Route exact path="/studentnews">
              <StudentNews />
            </Route>
            <Route exact path="/calculator">
              <Calculator />
            </Route>
            <Route exact path="/calculatorstudent">
              <CalculatorStudent />
            </Route>
            <Route exact path="/predictedgrades">
              <PredictedGrades />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
