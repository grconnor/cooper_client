import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from "axios";
import 'semantic-ui-css/semantic-min.css';
import './index.css';

let apiUrl;
if (process.env.NODE_ENV === "production") {
  apiUrl = "https://cr-cooper-api.herokuapp.com/api/v1"
} else {
  apiUrl = "http:/localhost:3000/api/v1";
}
axios.defaults.baseURL = apiUrl;

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
