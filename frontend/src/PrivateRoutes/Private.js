import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserSesesionContext } from '../UserSession/SessionContext.js';
import LoginModal from '../Components/LoginModal.js';

function PrivateRoute({ elm, setShowLoginModla, showLoginModla }) {

    const user = useContext(UserSesesionContext).userSession;

    if (!user) {
        setShowLoginModla(true)
        return <Navigate to={'/'} replace />
    }

}

export default PrivateRoute;
