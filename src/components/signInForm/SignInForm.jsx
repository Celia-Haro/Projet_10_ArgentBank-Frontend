import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginFailure } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import styles from "./signInForm.module.scss";

export default function SignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const error = useSelector((state) => state.auth.error);

    const loginUser = async (email, password) => {
        try {
            const response = await fetch("http://localhost:3001/api/v1/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                return data.body.token;
            } else {
                throw new Error(data.message || "Échec de la connexion");
            }

        } catch (error) {
            dispatch(loginFailure(error.message));
        }
    };

    const fetchUserProfile = async (token) => {
        try {
            const response = await fetch("http://localhost:3001/api/v1/user/profile", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            const userData = await response.json();
            if (!response.ok) throw new Error(userData.message || "Échec de la récupération de l'utilisateur");

            return userData.body;
        } catch (error) {
            dispatch(loginFailure(error.message));
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = await loginUser(email, password);
        if (token) {
            const userData = await fetchUserProfile(token);

            if (userData) {
                dispatch(loginSuccess({ user: userData, token, rememberMe }));
                navigate("/user-dashboard");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.inputWrapper}>
                <label htmlFor="email">Email</label>
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
                <input
                    type="checkbox"
                    id="remember-me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me">Remember me</label>
            </div>

            <button type="submit" className={styles.signInButton}>Sign In</button>
            {error && <p className={styles.errorMessage}>{error}</p>}
        </form>
    );
}
