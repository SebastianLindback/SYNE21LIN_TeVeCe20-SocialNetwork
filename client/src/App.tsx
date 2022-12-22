import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";
import Wall from "./components/Wall";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserWall from "./components/UserWall";
import UserCreate from "./components/UserCreate";
import Messages from "./components/Message/Messages";

// Create a client
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Wall />,
  },
  {
    path: "user/:userId",
    element: <UserWall />,
  },
  {
    path: "conversation/:userAId/:userBId",
    element: <Messages />,
  },
  {
    path: "user/create/:name",
    element: <UserCreate />,
  },
]);

function App() {
  return (
    <>
      <link rel="stylesheet" href={require("./css/style.css")} />
      <div className="container">
        <div className="wrapper">
          <img
            className="Logo"
            src={require("./photos/SocialMediaLogo.png")}
            alt=""
          />
          <h1 className="display-1 center">
            Lazy<strong>Book</strong>
          </h1>
        </div>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </div>
    </>
  );
}

export default App;
