import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { StartPage } from "./pages/StartPage";
import { PlayPage } from "./pages/PlayPage";
import { SummaryPage } from "./pages/SummaryPage";

const router = createBrowserRouter([
  { path: "/", element: <StartPage /> },
  { path: "/play", element: <PlayPage /> },
  { path: "/summary", element: <SummaryPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
