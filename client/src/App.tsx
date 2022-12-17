import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";
import Wall from "./components/Wall";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserWall from "./components/UserWall";
import UserCreate from "./components/UserCreate";
import Conversation from './components/conversation/Conversation';

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
    element: <Conversation />,
  },
  {
    path: "user/create/:name",
    element: <UserCreate />,
  },
]);

function App() {
  return (
    <div className="container">
      <h1 className="display-1 center">Social Network</h1>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
