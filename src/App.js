import "./App.css";
import Home from "./components/Home";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SearchItem from './components/SearchItem'
import AddItem from './components/AddItem'
import TradeNego from './components/TradeNego'
import Notifications from './components/Notifications'
import Login from './components/Login'
import Signup from './components/Signup'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';




function App() {
  return (
    <div className="App">
      <ToastContainer></ToastContainer>
      <Router>
          <Routes>
            <Route exact path="/Home" element={<Home />}></Route>
            <Route exact path="/Search" element={<SearchItem />}></Route>
            <Route exact path="/Add" element={<AddItem />}></Route>
            <Route exact path="/Notifications" element={<TradeNego />}></Route>
            <Route exact path="/Trade" element={<Notifications />}></Route>
            <Route exact path="/Login" element={<Login />}></Route>
            <Route exact path="/Signup" element={<Signup />}></Route>
            <Route exact path="/*" element={<Login />}></Route>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
