import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import { setCredientials } from '../../redux/features/user/userSlice';
import { useProfileMutation } from '../../redux/api/usersSlice';
import {toast} from 'react-toastify'

const Profile = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { userInfo } = useSelector((state) => state.user);

    const [updateProfile, { isLoading: isUpdatingProfile }] =
        useProfileMutation();

    const dispatch = useDispatch();

    useEffect(() => {
        setUsername(userInfo.username);
        setEmail(userInfo.email);
    }, [userInfo.username, userInfo.email]);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const res = await updateProfile({
                _id: userInfo._id,
                username,
                email,
                password,
            }).unwrap();
            dispatch(setCredientials({...res}))
            toast.success('Profile updated successfully')
        } catch (err) {
          toast.error(err?.data?.message || err.message)
        }
    };

    return (
        <div className='container mx-auto p-4 mt-[3rem]'>
            <div className='flex justify-center align-center'>
                <div className='w-2/5'>
                    <h2 className='text-2xl font-semibold mb-4 ml-1'>
                        Update Profile
                    </h2>
                    <form onSubmit={submitHandler}>
                        <div className='mb-4'>
                            <label
                                htmlFor='username'
                                className='block mb-2 ml-1'
                            >
                                Name
                            </label>
                            <input
                                type='text'
                                id='username'
                                className='form-input p-3 rounded-sm w-full border'
                                value={username}
                                onChange={(e) =>
                                    setUsername(e.target.value)
                                }
                            />
                        </div>
                        <div className='mb-4'>
                            <label
                                htmlFor='email'
                                className='block mb-2 ml-1'
                            >
                                Email Address
                            </label>
                            <input
                                type='email'
                                id='email'
                                className='form-input p-3 rounded-sm w-full border'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='mb-4'>
                            <label
                                htmlFor='password'
                                className='block mb-2 ml-1'
                            >
                                Password
                            </label>
                            <input
                                type='password'
                                id='password'
                                className='form-input p-3 rounded-sm w-full border'
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />
                        </div>
                        <div className='mb-4'>
                            <label
                                htmlFor='confirmPassword'
                                className='block mb-2 ml-1'
                            >
                                Confirm Password
                            </label>
                            <input
                                type='password'
                                id='confimrPassword'
                                className='form-input p-3 rounded-sm w-full border'
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </div>
                        <button
                            type='submit'
                            className='bg-cyan-500 text-white py-2 px-4 ml-1 rounded-lg hover:bg-cyan-600'
                        >
                            Update
                        </button>
                    </form>
                </div>
                {isUpdatingProfile && <Loader />}
            </div>
        </div>
    );
};

export default Profile;
