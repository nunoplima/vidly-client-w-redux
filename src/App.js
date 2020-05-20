import React, { Component } from "react";
import { Provider } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import configureStore from "./store/configureStore";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import MovieForm from "./components/MovieForm";
import Customers from "./components/Customers";
import Rentals from "./components/Rentals";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Register from "./components/Register";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";


const store = configureStore();

class App extends Component {    
    render() {
        return (
            <Provider store={store}>
                <ToastContainer />
                <Navbar />
                <main className="container">
                    <Switch>
                        <Route path="/movies/new" component={MovieForm} />
                        <Route path="/movies/:movieId" component={MovieForm} />
                        <Route path="/movies" component={Movies} />
                        <Route path="/customers" component={Customers} />
                        <Route path="/rentals" component={Rentals} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/not-found" component={NotFound} />
                        <Redirect from="/" exact to="/movies" />
                        <Redirect to="/not-found" />
                    </Switch>
                </main>
            </Provider>
        );
    }
}

export default App;
