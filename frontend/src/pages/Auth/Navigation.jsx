import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../redux/api/usersSlice';
import { logout } from '../../redux/features/user/userSlice';

const Navigation = () => {
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
                <div className='flex-grow'></div>
                <div className='flex items-center'>
                    <Link to={'/register'}>
                        <button clsd>Sign up</button>
                    </Link>
                    <Link
                        to={'/login'}
                        className='text-md font-semibold px-6 py-4 flex items-center'
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
            </div>
        </div>
    );
};

export default Navigation;
