import React, { useState } from "react";
import AppRouter from "./Router";
// eslint-disable-next-line
import { authService } from "../myfirebase"

function App() {
  console.log(authService.currentUser);
  // eslint-disable-next-line
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} Your Favourite Vulnerable Web App - SFU CMPT 732</footer>
    </>
  );
}

export default App;
