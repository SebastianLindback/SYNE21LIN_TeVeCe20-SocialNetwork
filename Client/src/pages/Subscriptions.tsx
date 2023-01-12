import React from "react";
import Heading from "../components/Heading";
import NavMenu from "../components/NavMenu";
import UserSubscriptions from "../components/collections/UserSubscriptions";


const Subscription = () => {

  return (
    <div className="container">
      {/* MENU */}
      <NavMenu menuItems={[
        {to:"/", text:"My feed"},
        {to:"/explore", text:"Explore Users"},
      ]}/>

      {/* HEADER */}
      <Heading title="my subscriptions" subtitle="will display your subscriptions"/>

      {/* CONTENT */}
      <UserSubscriptions/>
    </div>
  );
};

export default Subscription;
