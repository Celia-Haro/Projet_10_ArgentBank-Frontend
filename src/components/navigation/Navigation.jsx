import { Link } from "react-router-dom";
import logo from "../../assets/argentBankLogo.webp"
import styles from "./navigation.module.scss"

export default function Navigation() {

    return (
        <nav>
            <Link to="/">
                <img src={logo} alt="Argent Bank Logo" />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>

            <Link to="sign-in" className={styles.navLink}>
                <i className="fa fa-user-circle"></i>
                Sign In
            </Link>
        </nav>
    )
}