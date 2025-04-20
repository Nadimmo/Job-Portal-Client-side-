import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash, FaFacebook } from 'react-icons/fa'; // Import eye icons from react-icons
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import { FcGoogle } from 'react-icons/fc';
import PhoneLogin from './PhoneLogin';
import useAxiosPublic from '../../Components/Hooks/useAxiosPublic';

function Login() {
    const { signIn, googleSignIn, profileUpdate } = useContext(AuthContext)
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        // Clear specific error on input change
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
        setErrorMessage(''); // Clear error message on input change
    };

    const validateForm = () => {
        const newErrors = {};
        const { email, password } = formData;

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!password.trim()) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            // In a real application, you would make an API call to authenticate the user
            signIn(formData.email, formData.password)
                .then((result) => {
                    if (result.user) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Login successful!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        setFormData({ email: '', password: '' });
                        setErrors({});
                        navigate("/")
                    }
                })
                .catch((error) => {
                    console.error('Login error:', error);
                    setErrorMessage('Invalid email or password. Please try again.');
                });

        } else {
            setErrorMessage('Please correct the errors in the form.');
        }
    };


    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };


    const handleGoogle = () => {
        googleSignIn()
            .then((result) => {
                const name = result.user.displayName;
                const image = result.user.photoURL;
                const email = result.user.email;
                const userInfo = {
                    name, email
                }

                profileUpdate(name, image)
                    .then(res => {
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    // Show success message
                                    Swal.fire({
                                        title: "Registration Successful",
                                        text: "You have successfully registered!",
                                        icon: "success",
                                        confirmButtonText: "OK",
                                    })
                                    navigate('/')
                                } else {
                                    Swal.fire({
                                        title: "Registration Successful",
                                        text: "You have successfully registered!",
                                        icon: "success",
                                        confirmButtonText: "OK",
                                    })
                                    navigate('/')
                                }
                            })

                    })
            })
            .catch((error) => {
                console.error('Google login error:', error);
                setErrorMessage('Failed to sign in with Google. Please try again.');
            });
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white shadow-md rounded-lg p-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to Your Account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{' '}
                        <Link to={'/register'}

                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            create an account
                        </Link>
                    </p>
                </div>

                {errorMessage && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">{errorMessage}</span>
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div className='my-5'>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pr-10"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <button
                                        type="button"
                                        onClick={toggleShowPassword}
                                        className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                                    </button>
                                </span>
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            {/* You can add a "Remember me" checkbox here if needed */}
                        </div>

                        <div className="text-sm">
                            <button
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                Forgot your password?
                            </button>
                        </div>
                    </div>
                    <div className='divider'> or sign in with </div>
                    {/* Social Logins */}
                    <div className="mt-2">
                        <button onClick={handleGoogle} className="flex items-center justify-center w-full py-2 border rounded-lg hover:bg-gray-100 transition cursor-pointer">
                            <FcGoogle
                                className="mr-2 text-2xl" />
                            Sign in with Google
                        </button>
                        {/* phone number login */}
                        <PhoneLogin />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                {/* You can add an icon here if desired */}
                            </span>
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;