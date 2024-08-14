import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLoginMutation } from '../../redux/api/usersSlice';
import { setCredientials } from '../../redux/features/user/userSlice';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.user);

    const search = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await login({email, password}).unwrap()
            dispatch(setCredientials({...res}))
            toast.success('Logged in successfully!');
        } catch (err) {
            toast.error(err?.data?.message || err.message)
        }
    };

    return (
        <div>
            <section className='pl-[7rem] flex flex-wrap'>
                <div className='mr-[4rem] mt-[2rem]'>
                    <h1 className='text-2xl font-semibold mb-6 ml-1'>
                        Sign In
                    </h1>
                    <form
                        onSubmit={submitHandler}
                        className='container w-[30rem]'
                    >
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

                        <button
                            disabled={isLoading}
                            type='submit'
                            className='bg-cyan-500 text-white px-4 py-2 rounded-lg cursor-pointer my-[1rem]'
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </button>

                        {isLoading && <Loader />}
                    </form>
                    <div className=''>
                        <p>
                            New User?{'  '}
                            <Link
                                to={
                                    redirect
                                        ? `/register?redirect=${redirect}`
                                        : '/register'
                                }
                                className='text-cyan-500 hover:underline'
                            >
                                Register
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
