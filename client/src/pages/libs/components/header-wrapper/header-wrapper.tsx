import React from "react";
import { Outlet } from "react-router";
import { Header } from "./components";

function HeaderWrapper() {
  return (
    <div className="flex flex-col  gap-5  w-full bg-slate-200">
      <Header />
      <Outlet />
    </div>
  );
}

export { HeaderWrapper };
