import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../myfirebase"

function App() {
  const [init, setInit] = useState(false); // false by default
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing...."}
      <footer>&copy; {new Date().getFullYear()} FaVWApp, Your Favourite Vulnerable Web Application</footer>
    </>
  );
}

export default App;
