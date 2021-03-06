import React, { useState } from "react";
import { authService, firebaseInstance } from "../myfirebase";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true); // false by default
    const [error, setError] = useState("");
    const onChange = (event) => {
        const {
            target: {name, value},
        } = event;
        if (name === "email"){
            setEmail(value);
        } else if (name === "password"){
            setPassword(value);
        }
    };
    const onSubmit = async(event) => {
        event.preventDefault();
        try{
            // eslint-disable-next-line
            let data;
            if (newAccount) {
                // create account
                const data = await authService.createUserWithEmailAndPassword(email, password)
            } else {
                // user login
                const data = await authService.signInWithEmailAndPassword(email, password)
            }
        } catch(error){
            setError(error.messsage); 
        }
    };
    const toggleAccount = () => setNewAccount((prev) => !prev);
    const onSocialClick = async (event) => {
        const { target: {name} } = event; //ES6
        let provider;
        if (name === "google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="text" placeholder="Email" requried value={email} onChange={onChange} />
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign in" : "Create Account"}</span>
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
                <button onClick={onSocialClick} name="github">Continue with Github</button>
            </div>
        </div>
    );
}

export default Auth;