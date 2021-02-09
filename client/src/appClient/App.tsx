import React, {Component} from 'react';
import './App.scss';
import {Header} from '../components/layout/header/Header';
import ContentContainer from "../components/containers/ContentContainer/ContentContainer";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <ContentContainer/>
            </div>
        );
    }
}

export default App;
