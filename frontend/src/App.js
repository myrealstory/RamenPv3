import logo from "./logo.svg";
import "./App.css";
import Nav from "./components/nav";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <Nav />
                    <p>Hello World!</p>
                </header>
            </div>
        </Router>
    );
}

export default App;
