import { Link } from "react-router-dom";
import logo from "../../assets/argentBankLogo.webp"
import styles from "./navigation.module.scss"

export default function Navigation() {

    return (
        <nav>
            <Link to="/">
                <img src={logo} alt="Argent Bank Logo" />
            </Link>

            <Link to="log-in" className={styles.navLink}>
                <i className="fa fa-user-circle"></i>
                Sign In
            </Link>
        </nav>
    )
}