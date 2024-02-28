import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/login.tsx";
import Signup from "./components/signup.tsx";
import Dashboard from "./components/Dashboard.tsx";
import { UserAuthContextProvider } from "./context/UserAuthContext";

function App() {
  return (
    <BrowserRouter>
    <UserAuthContextProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user/*" element={<Dashboard />} />
      </Routes>
      </UserAuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
