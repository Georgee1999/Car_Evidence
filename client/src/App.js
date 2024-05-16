import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import UserDashboard from "./pages/Dashboard/UserDashboard";
import { UserProvider } from "./context/UserContext";


function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<UserDashboard />}/>
          </Route>

          <Route path="*" element={"Not Found"} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;