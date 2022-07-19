
import "./App.css";
import FoodMenu from './Pages/components/FoodMenu'
import Home from "./Pages/components/Home";
import MainPage  from "./Pages/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <div className="App">
                <header className="AppHeader">
                    {/* <Nav /> */}
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
