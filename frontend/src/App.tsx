import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import { ThemeProvider } from "@emotion/react";
import { createMuiTheme } from "./theme/theme";
import Explore from "./pages/Explore";
import Server from "./pages/Server";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthServiceProvider } from "./context/AuthContext";
import TestLogin from "./pages/TestLogin";
import ProtectedRoute from "./services/ProtectedRoute";


const App = () => {
  const theme = createMuiTheme();
  return (
    <BrowserRouter>
      <AuthServiceProvider>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/server/:serverId/:channelId?"
              element={
                <ProtectedRoute>
                  <Server />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/explore/:categoryName" element={<Explore />} />
            <Route
              path="/testlogin"
              element={
                <ProtectedRoute>
                  <TestLogin />
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
        </ThemeProvider>
      </AuthServiceProvider>
    </BrowserRouter>
  );
};

export default App;
