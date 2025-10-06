import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
// import Watch from "./pages/Watch";
import Watchlist from "./pages/Watchlist";
import Watch from "./pages/Watch";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/watch/:id" element={<MovieDetail />}/>
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/play/:id" element={<Watch />} />
        

        
      </Routes>
    </Router>
  );
}

export default App;
