import SignInForm from "../../components/signInForm/SignInForm"
import styles from "./signIn.module.scss"

export default function SignIn() {

    return (
        <>
            <main className="bg-dark">
                <section className={styles.signInContent}>
                    <i className="fa fa-user-circle"></i>
                    <h1>Sign In</h1>
                    <SignInForm />
                </section>
            </main >
        </>
    )
}