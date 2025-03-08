import styles from "./home.module.scss";
import FeatureItem from "../../components/featureItem/FeatureItem";
import chatIcon from "../../assets/icon-chat.webp";
import moneyIcon from "../../assets/icon-money.webp";
import securityIcon from "../../assets/icon-security.webp";

const featuresData = [
    {
        icon: chatIcon,
        alt: "Chat Icon",
        title: "You are our #1 priority",
        description:
            "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
    },
    {
        icon: moneyIcon,
        alt: "Money Icon",
        title: "More savings means higher rates",
        description:
            "The more you save with us, the higher your interest rate will be!",
    },
    {
        icon: securityIcon,
        alt: "Security Icon",
        title: "Security you can trust",
        description:
            "We use top-of-the-line encryption to make sure your data and money is always safe.",
    },
];

export default function Home() {

    return (
        <>
            <div className={styles.hero}>
                <section className={styles.heroContent}>
                    <h2 className="sr-only">Promoted Content</h2>
                    <p className={styles.subtitle}>No fees.</p>
                    <p className={styles.subtitle}>No minimum deposit.</p>
                    <p className={styles.subtitle}>High interest rates.</p>
                    <p className={styles.text}>Open a savings account with Argent Bank today!</p>
                </section>
            </div>

            <section className={styles.features}>
                <h2 className="sr-only">Features</h2>
                {featuresData.map((feature, index) => (
                    <FeatureItem
                        key={index}
                        icon={feature.icon}
                        alt={feature.alt}
                        title={feature.title}
                        description={feature.description}
                    />
                ))}
            </section>
        </>
    );
}
