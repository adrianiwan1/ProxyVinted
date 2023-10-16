import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserSesesionContext } from '../UserSession/SessionContext.js';

function PrivateRoute({ component, setShowLoginModla }) {

    const user = useContext(UserSesesionContext).userSession;

    if (!user) {
        setShowLoginModla(true)
        return <Navigate to={'/'} replace />
    }
    return component
}

export default PrivateRoute;
