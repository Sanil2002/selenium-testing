import { Route, Routes } from "react-router-dom"
import Login from "./Pages/Login"
import Successfull from "./Pages/Successfull"
import Notsuccessfull from "./Pages/Notsuccessfull"

function App() {

  return (
  <>
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/successfull" element={<Successfull />} />
    <Route path="/notsuccessfull" element={<Notsuccessfull />} />
  </Routes>
  
  </>)
}

export default App
