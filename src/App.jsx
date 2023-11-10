import Home from "./Components/Pages/Home/Home"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Products from "./Components/Pages/Products/Products";
import Carts from "./Components/Pages/Carts/Carts";
import Login from "./Components/Pages/Login/Login";
import Success from "./Components/Pages/Message/Success";
import Cancel from "./Components/Pages/Message/Cancel";


function App() {

  return (
    <>

      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/Carts" element={<Carts />} />
          <Route path="/Success" element={<Success />} />
          <Route path="/Cancel" element={<Cancel />} />
          {/* <Route path="/" element={<Home />} /> */}
        </Routes>
      </Router>

    </>
  )
}

export default App
