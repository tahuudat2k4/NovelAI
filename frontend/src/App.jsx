import { Routes,Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TryPage from "./pages/TryPage";


function App() {
  return (   
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/try' element={<TryPage/>}/>
    </Routes>
  )
}

export default App;
