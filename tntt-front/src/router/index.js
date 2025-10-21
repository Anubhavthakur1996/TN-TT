import { createBrowserRouter } from "react-router";
import Splash from "../screens/splash";
import Home from "../screens/home";
import Login from "../screens/auth";
import Hot from "../screens/hot";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Splash,
  },
  {
    path: "/home",
    Component: Home,
  },
  {
    path: "/hot",
    Component: Hot,
  },
  {
    path: "/login",
    Component: Login,
  },
]);

export default router;
