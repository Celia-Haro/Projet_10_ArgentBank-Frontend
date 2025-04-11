import { Link } from 'react-router-dom';
import styles from "./pageNotFound.module.scss"

export default function PageNotFound() {
    return (
        <div className={styles.errorContainer}>
            <h1>404 - Page not found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link to="/">Homepage</Link>
        </div>
    )
}