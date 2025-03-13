import { useState } from "react";
import styles from "./signInForm.module.scss"

export default function SignInForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("email et password :", { email, password });
        console.log(JSON.stringify({ email, password }))

        try {
            const response = await fetch("http://localhost:3001/api/v1/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log(data)
            if (response.ok) {
                console.log("ça a marché");
            } else {
                throw new Error(data.message || "Login failed");
            }
        } catch (error) {
            console.log("erreur", error);
        }
    };

    return (

        <form onSubmit={handleSubmit}>
            <div className={styles.inputWrapper}>
                <label htmlFor="email">email</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className={styles.inputWrapper}>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className={styles.inputRemember}>
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Remember me</label>
            </div>

            <button type="submit" className={styles.signInButton}>Sign In</button>
        </form >
    );
}
