// src/routes.jsx
import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Patients from "./pages/Patients";
import RegisterEvolution from "./pages/RegisterEvolution";
import Statistics from "./pages/Statistics";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "pacientes", element: <Patients /> },
      { path: "registrar", element: <RegisterEvolution /> },
      { path: "estadisticas", element: <Statistics /> },
    ],
  },
]);

export default router;
