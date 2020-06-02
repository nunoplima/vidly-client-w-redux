import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { recieveUser } from "./store/user";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import MovieForm from "./components/MovieForm";
import Customers from "./components/Customers";
import Rentals from "./components/Rentals";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.enteties.user);

    useEffect(() => {
        const user = auth.getCurrentUser();
        dispatch(recieveUser(user || {}));
    }, [dispatch]);

    return (
        <>
            <ToastContainer />
            <Navbar username={user.username} />
            <main className="container">
                <Switch>
                    <ProtectedRoute path="/movies/:movieId" component={MovieForm} />
                    <Route path="/movies" component={Movies} />
                    <Route path="/customers" component={Customers} />
                    <Route path="/rentals" component={Rentals} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/not-found" component={NotFound} />
                    <Redirect from="/" exact to="/movies" />
                    <Redirect to="/not-found" />
                </Switch>
            </main>
        </>
    );
};

export default App;
