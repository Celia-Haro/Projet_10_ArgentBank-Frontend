import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/authSlice';
import styles from './editUserForm.module.scss';

export default function EditUserForm({ onCancel }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);

    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (user?.userName) {
            setUsername(user.userName);
        }
    }, [user]);

    const updateUserProfile = async (newUsername) => {
        const response = await fetch('http://localhost:3001/api/v1/user/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ userName: newUsername }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to update username.');
        }
        return data;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const data = await updateUserProfile(username);
            dispatch(updateUser({ userName: data.body.userName }));
            onCancel();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <h1>Edit user info</h1>

            <div className={styles.blocInput}>
                <label htmlFor="username">User name :</label>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>

            <div className={styles.blocInput}>
                <label htmlFor="firstname">First name :</label>
                <input type="text" name="firstname" value={user?.firstName || ''} disabled />
            </div>

            <div className={styles.blocInput}>
                <label htmlFor="lastname">Last name :</label>
                <input type="text" name="lastname" value={user?.lastName || ''} disabled />
            </div>

            {error && <p>{error}</p>}

            <div className={styles.blocAction}>

                <button className={styles.actionButton} type="submit">Save</button>
                <button className={styles.actionButton} type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
}
