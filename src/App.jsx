import React, { Component } from "react"
import DisplayCooperResult from "./components/DisplayCooperResult";
import InputFields from "./components/InputFields";
import LoginForm from "./components/LoginForm";
import { authenticate } from "./modules/auth";
import DisplayPerformanceData from "./components/DisplayPerformanceData";
import { button } from 'semantic-ui-react';

class App extends Component {
  state = {
    distance: "",
    gender: "female",
    age: "",
    renderLoginForm: false,
    authenticated: false,
    message: "",
    entrySaved: false

  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value, entrySaved: false });
  };

  onLogin = async e => {
    e.preventDefault();
    const response = await authenticate(
      e.target.email.value,
      e.target.password.value
    );
    if (response.authenticated) {
      this.setState({ authenticated: true });
    } else {
      this.setState({ message: response.message, renderLoginForm: false });
    }
  };

  render() {
    let performanceDataIndex;
    const { renderLoginForm, authenticated, message } = this.state;
    let renderLogin;
    switch (true) {
      case renderLoginForm && !authenticated:
        renderLogin = <LoginForm submitFormHandler={this.onLogin} />;
        break;
      case !renderLoginForm && !authenticated:
        renderLogin = (
          <>
            <button
              color="black"
              id="login"
              onClick={() => this.setState({ renderLoginForm: true })}
            >
              Login
            </button>
            <p id="message">{message}</p>
          </>
        );
        break;

      let performanceDataIndex;
      case authenticated:
        renderLogin = (
          <p id="message" >
            Hi {JSON.parse(sessionStorage.getItem("credentials")).uid}
          </p>
        );
        if (this.state.renderIndex) {
          performanceDataIndex = (
            <>
              <DisplayPerformanceData
                updateIndex={this.state.updateIndex}
                indexUpdated={() => this.setState({ updateIndex: false})}
              />
              <button
                color="black"
                onClick={() => this.setState({ renderIndex: false })}
              >
                Hide past entries
                </button>
            </>
          );
        } else {
          performanceDataIndex = (
            <button
              id="show-index"
              onClick={() => this.setState({ renderIndex: true})}
            >
              Show past entries
            </button>
          );
        }
        break;
        default:
          break;
      };

    const renderLogin = this.state.renderLoginForm ? (
      <LoginForm submitFormHandler={this.onLogin} />
    ) : (
      <button
        id="login"
        onClick={() => this.setState({ renderLoginForm: true })}
      >
        Login
      </button>
      
    );

    return (
      <>
        <InputFields onChangeHandler={this.onChangeHandler} />
        {renderLogin}

        <DisplayCooperResult
          distance={this.state.distance}
          gender={this.state.gender}
          age={this.state.age}
          authenticated={this.state.authenticated}
          entrySaved={this.state.entrySaved}
          entryHandler={() => this.setState({ entrySaved: true, updateIndex: true})}
        />
        {performanceDataIndex}
      </>
    );
  }
}
export default App;