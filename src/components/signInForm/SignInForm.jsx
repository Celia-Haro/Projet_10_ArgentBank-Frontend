import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginFailure } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import styles from "./signInForm.module.scss"

export default function SignInForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const error = useSelector((state) => state.auth.error);

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                dispatch(loginSuccess({ user: data.user, token: data.token }));
                navigate("/user-dashboard");
            } else {
                dispatch(loginFailure(data.message || "Login failed"));
            }
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            dispatch(loginFailure("Erreur de connexion"));
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
            {error && <p className={styles.errorMessage}>{error}</p>}
        </form >
    );
}
