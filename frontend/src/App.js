import logo from "./logo.svg";
import "./App.css";
import Nav from "./components/nav";
import Home from './components/Home';
import FoodMenu from "./components/FoodMenu";
import MainPage  from "./Pages/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <Nav />
                    <MainPage />
                    <Routes>
                        <Route path="/" element={<Home/>}></Route>
                        <Route path="/FoodMenu" element={<FoodMenu />}></Route>
                        {/* <Route path="/" element={  }></Route> */}
                
                        
                    </Routes>
                  
                </header>
            </div>
        </Router>
    );
}

export default App;
