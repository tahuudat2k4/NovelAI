import { Routes,Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TryPage from "./pages/TryPage";
import NovelPage from "./pages/NovelPage";

function App() {
  return (   
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/try' element={<TryPage/>}/>
      <Route path='/novel' element={<NovelPage/>}/>
    </Routes>
  )
}

export default App;
