import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/auth.context";
import CustomToast from "./components/toasts/toasts.component";
import PrivateRoute from "./components/ProtectedRoute/ProtectedRoute.component";
import Auth from "./pages/authentication/auth.page";
import Home from "./pages/home/home.page";
import WeatherOffavourites from "./pages/favourites/WeatherOffavourites";
import CustomLayout from "./components/layout/layout.component";
import { useContext } from "react";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <CustomToast position={"top-right"} />
      <Router>
        <CustomLayout>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/auth" element={<Auth />} />
            <Route
              exact
              path="/weatherOffavourites"
              element={
                <PrivateRoute user={user}>
                  <WeatherOffavourites />
                </PrivateRoute>
              }
            />
          </Routes>
        </CustomLayout>
      </Router>
    </>
  );
}

export default App;
