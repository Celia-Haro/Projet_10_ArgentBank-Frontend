import { useLocation } from 'react-router-dom';

export default function UserAccountDetail() {

    const location = useLocation();
    const { name, balance, type, transactions } = location.state || {};

    return (
        <>
            <p>je suis le composant UserAccountDetail</p>
            <div>
                <h2>Détails du compte</h2>
                <h3>{name}</h3>
                <p>{balance}</p>
                <p>{type}</p>
                <ul>
                    {transactions?.map((transaction) => (
                        <li key={transaction.id}>{transaction.description}</li>
                    ))}
                </ul>
            </div>
        </>
    )
}