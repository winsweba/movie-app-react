import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Movies from "./pages/Movies";
import Popular from "./pages/Popular";
import Search from "./pages/Search";
import Try from "./pages/Try";
import TVShows from "./pages/TVShows";

function App() {

  return (
    <BrowserRouter>
    <div className="App">
      <Navbar/>
      
      <div>
      
     <Routes>
       <Route path="/" element={<Popular />}  />
       <Route path="/try" element={<Try />} />
       <Route path="/movies" element={<Movies />} />
       <Route path="/search" element={<Search />} />
     </Routes>
     </div>
     </div>
     
    {/* </div> */}
    </BrowserRouter>
  );
}

export default App;
