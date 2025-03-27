import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginFailure } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import styles from "./signInForm.module.scss";

export default function SignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
                console.log("ça a marché");
                localStorage.setItem('token', data.body.token);
            } else {
                throw new Error(data.message || "Login failed");
            }
            return data.body.token;
        } catch (error) {
            dispatch(loginFailure(error.message));

        }
    };

    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch("http://localhost:3001/api/v1/user/profile", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            const userData = await response.json();
            if (!response.ok) throw new Error(userData.message || "User fetch failed");

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
                console.log(userData)
                dispatch(loginSuccess({ user: userData, token }));
                navigate("/user-dashboard");
            }
            navigate("/user-dashboard");
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
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Remember me</label>
            </div>

            <button type="submit" className={styles.signInButton}>Sign In</button>
            {error && <p className={styles.errorMessage}>{error}</p>}
        </form>
    );
}
