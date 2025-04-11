import { useSelector } from 'react-redux';
import { useState } from 'react';
import data from '../../assets/accountsData.json';
import BAccountView from '../../components/bankAccountView/BAccountView';
import styles from "./userDashboard.module.scss";
import EditUserForm from '../../components/editUserForm/EditUserForm';

export default function UserDashboard() {
    const user = useSelector((state) => state.auth.user);
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(true);
    };

    return (
        <main className="bg-dark">
            <div className={styles.header}>
                {showForm ? (
                    <EditUserForm onCancel={() => setShowForm(false)} />
                ) : (
                    <>
                        {user && (
                            <>
                                <h1>
                                    Welcome back <br />
                                    {user.firstName} {user.lastName}!
                                </h1>
                                <button onClick={toggleForm} className={styles.editButton}>
                                    Edit Name
                                </button>
                            </>
                        )}
                    </>
                )}
            </div>

            <h2 className="sr-only">Accounts</h2>

            {data.accounts.map((account) => (
                <BAccountView
                    key={account.id}
                    {...account}
                />
            ))}
        </main>
    );
}
