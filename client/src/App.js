import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import UserDashboard from "../src/User/UserDashboard";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<UserDashboard />}/>
          </Route>

          <Route path="*" element={"Not Found"} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
