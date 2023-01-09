import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";
import "./css/style.css";
import Wall from "./pages/Wall";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserWall from "./pages/UserWall";
import Conversation from "./pages/conversation/Conversation";
import Subscriptions from "./pages/Subscriptions";
import Admin from "./pages/Admin";
import Layout from "./pages/Layout";

// Create a client
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
    {
      path: "/",
      element: <Wall />,
    },
    {
      path: "user/:userId",
      element: <UserWall />,
    },
    {
      path: "subscriptions/:subscriptionId",
      element: <Subscriptions />,
    },
    {
      path: "conversation/:userAId/:userBId",
      element: <Conversation />,
    },
    {
      path: "/admin",
      element: <Admin />,
    }
  ]
  }
  
]);

function App() {
  return (
    <>
      
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}/> 
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        
    </>
  );
}

export default App;
