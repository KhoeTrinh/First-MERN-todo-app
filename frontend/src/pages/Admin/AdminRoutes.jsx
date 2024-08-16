import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoutes = () => {
    const { userInfo } = useSelector((state) => state.user);

    return userInfo && userInfo.isAdmin ? (
        <Outlet/>
    ): (
        <Navigate to='/login' replace/>
    );
};

export default AdminRoutes;
