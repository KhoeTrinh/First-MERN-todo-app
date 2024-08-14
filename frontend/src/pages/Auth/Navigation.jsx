import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../redux/api/usersSlice';
import { logout } from '../../redux/features/user/userSlice';
import ToggleArrow from '../../components/ToggleArrow';

const Navigation = () => {
    const { userInfo } = useSelector((state) => state.user);

    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const closeSidebar = () => {
        setShowSidebar(false);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async() => {
        try {
            await logoutApiCall().unwrap()
            dispatch(logout());
            navigate('/login');
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className='bg-white'>
            <div className='flex'>
                <Link to={'/'}>
                    <img
                        src='https://th.bing.com/th/id/R.929020ebfa31c1bde47e260a0de26557?rik=yj%2fCYdTXo3NQSA&pid=ImgRaw&r=0'
                        alt=':D'
                        className='h-16 w-16 px-6 py-4 box-content'
                    />
                </Link>
                <div className='flex-grow flex justify-center items-center'>
                    <div className='m-2'>
                        <Link
                            to={'/todolist'}
                            className='text-md font-semibold px-4 py-2 flex items-center transition-transform transform hover:scale-125'
                        >
                            Todo List
                        </Link>
                    </div>
                    <div className='m-2'>
                        <Link
                            to={'/important'}
                            className='text-md font-semibold px-4 py-2 flex items-center transition-transform transform hover:scale-125'
                        >
                            Important
                        </Link>
                    </div>
                    <div className='m-2'>
                        <Link
                            to={'/profile'}
                            className='text-md font-semibold px-4 py-2 flex items-center transition-transform transform hover:scale-125'
                        >
                            Profile
                        </Link>
                    </div>
                    <div className='m-2'>
                        <Link
                            to={'/community'}
                            className='text-md font-semibold px-4 py-2 flex items-center transition-transform transform hover:scale-125'
                        >
                            Community
                        </Link>
                    </div>
                </div>

                <div className='relative flex items-center w-[15rem]'>
                    <button onClick={toggleSidebar}>
                        {userInfo ? (
                            <ToggleArrow
                                userInfo={userInfo}
                                showSidebar={showSidebar}
                            />
                        ) : (
                            <></>
                        )}
                    </button>

                    {showSidebar && userInfo && (
                        <ul className='absolute right-0 mt-2 mr-14 bg-pink-50 text-cyan-400 top-20 rounded-lg'>
                            {userInfo.isAdmin && (
                                <>
                                    <li>
                                        <Link
                                            to={'/admin/dashboard'}
                                            className='block font-semibold px-5 py-3'
                                        >
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={'/admin/todotyplist'}
                                            className='block font-semibold px-5 py-3'
                                        >
                                            Todo Type
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={'/admin/userlist'}
                                            className='block font-semibold px-5 py-3'
                                        >
                                            Users
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={'/admin/communitylist'}
                                            className='block font-semibold px-5 py-3'
                                        >
                                            Community
                                        </Link>
                                    </li>
                                </>
                            )}
                            <li>
                                <Link
                                    to={'/profile'}
                                    className='block font-semibold px-5 py-3'
                                >
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link
                                    onClick={logoutHandler}
                                    className='block font-semibold px-5 py-3'
                                >
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    )}

                    {!userInfo && (
                        <div className='flex items-center'>
                            <Link to={'/register'}>
                                <button className='px-4 py-2 bg-violet-600 rounded-lg text-white m-3'>
                                    Sign up
                                </button>
                            </Link>
                            <Link
                                to={'/login'}
                                className='text-md font-semibold px-4 py-2 flex items-center m-3'
                            >
                                Log in{' '}
                                <span
                                    aria-hidden='true'
                                    className='font-bold'
                                >
                                    &rarr;
                                </span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navigation;
