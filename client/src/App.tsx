import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";
import "./css/style.css";
import Wall from "./pages/Wall";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import UserWall from "./pages/UserWall";
import UserCreate from "./pages/UserCreate";
import Conversation from "./pages/conversation/Conversation";
import Subscription from "./pages/Subscription";

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
    path: "subscription/:subscriptionId",
    element: <Subscription />,
  },
  {
    path: "conversation/:userAId/:userBId",
    element: <Conversation />,
  },
]);

function App() {
  return (
    <>
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
