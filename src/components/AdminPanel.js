import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const AdminPanel = () => {
  //   return <div>Hello From Admin panel</div>;
  return (
    <>
      <Header />
      <div class="columns is-variable is-0">
        <Sidebar />
      </div>
    </>
  );
};

export default AdminPanel;
