import styles from "./bAccount.module.scss"

export default function BAccountView({ name, number, balance, type }) {

    return (
        <>
            <section className={styles.account}>
                <div className={styles.accountContentWrapper}>
                    <h3 className={styles.accountTitle}> {name} ({number})</h3>
                    <p className={styles.accountAmount}>${balance}</p>
                    <p className={styles.accountAmountDescription}> {type}</p>
                </div>
                <div className={`${styles.accountContentWrapper} ${styles.cta}`}>
                    <button className={styles.transactionButton}>View transactions</button>
                </div>
            </section>
        </>
    )
}
