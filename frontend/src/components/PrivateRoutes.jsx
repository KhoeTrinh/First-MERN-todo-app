import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoutes = () => {
    const {userInfo } = useSelector(state => state.user)

    return userInfo ? <Outlet/> : <Navigate to='/login' replace />
};

export default PrivateRoutes;
