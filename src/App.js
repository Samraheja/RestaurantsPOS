import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import "./assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/css/argon-dashboard-react.css";
import AdminLayout from "./layouts/Admin";
import AuthLayout from "./layouts/Auth";
import { store } from "./redux-store/store";
import { Provider } from "react-redux";
import history from "./utils/history";

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
          <Redirect from="/" to="/auth/login" />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
