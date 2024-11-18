import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import { ThemeProvider } from "@emotion/react";
import { createMuiTheme } from "./theme/theme";
import Explore from "./pages/Explore";
import Server from "./pages/Server";
import Login from "./pages/Login";
import { AuthServiceProvider } from "./context/AuthContext";
import TestLogin from "./pages/TestLogin";
import ProtectedRoute from "./services/ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/server/:serverId/:channelId?" element={<Server />} />
      <Route path="/login" element={<Login />} />
      <Route path="/explore/:categoryName" element={<Explore />} />
      <Route
        path="/testlogin"
        element={
          <ProtectedRoute>
            <TestLogin />
          </ProtectedRoute>
        }
      ></Route>
    </Route>
  )
);

const App = () => {
  const theme = createMuiTheme();
  return (
    <AuthServiceProvider>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthServiceProvider>
  );
};

export default App;
