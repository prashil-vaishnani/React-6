import React from "react";
import { UserListCardWrapper } from "./components/UserListCardWrapper/UserListCardWrapper";
import Auth from "./components/Auth";
import Header from "./components/Header";
import { useAppSelector } from "./store/hook";

function App() {
  const isAuth: boolean = useAppSelector((state) => state.isAuthenticated);
  return (
    <>
      <Header />
      {!isAuth && <Auth />}
      {isAuth && <UserListCardWrapper />}
    </>
  );
}

export default App;
