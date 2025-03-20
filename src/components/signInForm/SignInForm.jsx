import { useState } from "react";
import styles from "./signInForm.module.scss"
import { useNavigate } from "react-router-dom";

export default function SignInForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            const response = await fetch("http://localhost:3001/api/v1/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setErrorMessage("");
                localStorage.setItem("token", data.token);
                navigate("/user-dashboard");
            } else {
                throw new Error(data.message || "Identifiants incorrects.");
            }
        } catch (error) {
            setErrorMessage(error.message || "Le service est momentanément indisponible.");
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
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        </form >
    );
}
