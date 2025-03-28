import { Link } from "react-router-dom";
import logo from "../../assets/argentBankLogo.webp"
import styles from "./navigation.module.scss"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";

export default function Navigation() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <nav>
            <Link to="/">
                <img src={logo} alt="Argent Bank Logo" />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            {isAuthenticated ? (
                <div>
                    <Link to="/user-dashboard" className={styles.navLink}>
                        <i className="fa fa-user-circle"></i>
                        {user?.firstName}
                    </Link>

                    <Link to="/" onClick={handleLogout} className={styles.navLink}>
                        <i className="fa fa-sign-out"></i>
                        Sign Out
                    </Link>
                </div>
            ) : (
                <Link to="/sign-in" className={styles.navLink}>
                    <i className="fa fa-user-circle"></i>
                    Sign In
                </Link>
            )}
        </nav>
    )
}