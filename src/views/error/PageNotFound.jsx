import { Link } from 'react-router-dom';
import styles from "./pageNotFound.module.scss"

export default function PageNotFound() {
    return (
        <div className={styles.errorContainer}>
            <h1>404 - Page non trouvée</h1>
            <p>La page que vous cherchez n'existe pas.</p>
            <Link to="/">Retour à l’accueil</Link>
        </div>
    )
}