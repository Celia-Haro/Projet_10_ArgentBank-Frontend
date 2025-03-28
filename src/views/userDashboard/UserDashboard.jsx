import { useSelector } from 'react-redux';
import data from '../../assets/accountsData.json';
import BAccountView from '../../components/bankAccountView/BAccountView';
import styles from "./userDashboard.module.scss"

export default function UserDashboard() {

    const user = useSelector((state) => state.auth.user);


    return (
        <>
            <main className="bg-dark">

                <div className={styles.header}>
                    <h1> Welcome back <br />{user.firstName} {user.lastName} !</h1>
                    <button className={styles.editButton}> Edit Name</button>
                </div>


                <h2 className="sr-only">Accounts</h2>

                {data.accounts.map((account, index) => (
                    <BAccountView
                        key={index}
                        {...account}
                    />
                ))}

            </main>
        </>
    )
}
