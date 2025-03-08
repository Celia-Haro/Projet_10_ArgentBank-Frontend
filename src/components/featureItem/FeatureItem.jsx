import PropTypes from "prop-types";
import styles from "./featureItem.module.scss";

export default function FeatureItem({ icon, alt, title, description }) {

    return (
        <div className={styles.featureItem}>
            <img src={icon} alt={alt} className={styles.featureIcon} />
            <h3 className={styles.featureItemTitle}>{title}</h3>
            <p>{description}</p>
        </div>
    );
}

FeatureItem.propTypes = {
    icon: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};