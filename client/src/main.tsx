import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QuestionForm } from "./components/QuestionForm";
import { PlayPage } from "./pages/PlayPage";
import './index.css'
import App from './App.tsx'

const router = createBrowserRouter([
  { path: "/", element: <PlayPage /> },
  { path: "/admin/new", element: <App><QuestionForm /></App> }, // ha az App a keret, maradhat így
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);