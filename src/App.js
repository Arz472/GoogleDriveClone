import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/login.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
