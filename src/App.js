import React, { Component } from "react";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import Movies from "./components/Movies";


const store = configureStore();

class App extends Component {    
    render() {
        return (
            <Provider store={store}>
                <main className="container">
                    <Movies />
                </main>
            </Provider>
        );
    }
}

export default App;
