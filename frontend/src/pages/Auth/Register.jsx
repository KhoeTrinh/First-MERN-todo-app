import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useRegisterMutation } from '../../redux/api/usersSlice';
import { setCredientials } from '../../redux/features/user/userSlice';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();

    const { userInfo } = useSelector((state) => state.user);

    const search = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async(e) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            const res = await register({username, email,password}).unwrap()
            dispatch(setCredientials({...res}))
            toast.success('Successfully registered')
        } catch (err) {
            toast.error(err?.data?.message || err.message)
        }
    }

    return (
        <div>
            <section className='pl-[7rem] flex flex-wrap'>
                <div className='mr-[4rem] mt-[2rem]'>
                    <h1 className='text-2xl font-semibold mb-6 ml-1'>
                        Register
                    </h1>
                    <form onSubmit={submitHandler} className='container w-[30rem]'>
                        <div>
                            <label
                                htmlFor='username'
                                className='block px-1 pt-1'
                            >
                                Username
                            </label>
                            <input
                                type='text'
                                id='username'
                                className='mt-1 p-2 bg-stone-50 border-2 focus:border-teal-500 focus:outline-none rounded-lg w-full'
                                value={username}
                                onChange={(e) =>
                                    setUsername(e.target.value)
                                }
                            />
                        </div>
                        <div>
                            <label
                                htmlFor='email'
                                className='block px-1 pt-1'
                            >
                                Email Address
                            </label>
                            <input
                                type='email'
                                id='email'
                                className='mt-1 p-2 bg-stone-50 border-2 focus:border-teal-500 focus:outline-none rounded-lg w-full'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor='password'
                                className='block px-1 pt-1'
                            >
                                Password
                            </label>
                            <input
                                type='password'
                                id='password'
                                className='mt-1 p-2 bg-stone-50 border-2 focus:border-teal-500 focus:outline-none rounded-lg w-full'
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />
                        </div>
                        <div>
                            <label
                                htmlFor='confirmPassword'
                                className='block px-1 pt-1'
                            >
                                Confirm Password
                            </label>
                            <input
                                type='password'
                                id='confirmPassword'
                                className='mt-1 p-2 bg-stone-50 border-2 focus:border-teal-500 focus:outline-none rounded-lg w-full'
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </div>

                        <button
                            disabled={isLoading}
                            type='submit'
                            className='bg-cyan-500 text-white px-4 py-2 rounded-lg cursor-pointer my-[1rem]'
                        >
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </button>

                        {isLoading && <Loader />}
                    </form>
                    <div>
                        <p>
                            Already have an account?{' '}
                            <Link
                                to={
                                    redirect
                                        ? `/login?redirect=${redirect}`
                                        : '/login'
                                }
                                className='text-cyan-500 hover:underline'
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Register;
