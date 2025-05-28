import { RouterProvider as ReactRouterProvider } from "react-router-dom";
import router from "./router";

const RouterProvider: React.FC = () => <ReactRouterProvider router={router} />;

export default RouterProvider;
