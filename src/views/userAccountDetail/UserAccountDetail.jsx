import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function UserAccountDetail() {
    const account = useSelector((state) => state.account.selectedAccount);
    const navigate = useNavigate();

    useEffect(() => {
        if (!account) {
            navigate("/user-dashboard");
        }
    }, [account, navigate]);

    if (!account) return null;

    return (
        <div>
            {/* !! Créer le bandeau pour avoir une vue du compte */}
            <h1>{account.name} ({account.number})</h1>
            <p>Balance: ${account.balance}</p>
            <p>Type: {account.type}</p>

            <h2>Transactions</h2>

            {/* !! utiliser le composant transaction collapse pour chaque transaction */}
            <ul>
                {account.transactions?.map((tx, index) => (
                    <li key={index}>
                        {tx.date} - {tx.description} - ${tx.amount}
                    </li>
                ))}
            </ul>
        </div>
    );
}
