import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

function Register() {
    const { signUp, profileUpdate, googleSignIn,  facebookSignIn } = useContext(AuthContext);
    const navigate = useNavigate()
    // Assuming you have a useAuth hook to access the AuthContext]

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        userType: 'jobseeker', // Default to jobseeker
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {};
        const { firstName, lastName, email, password, confirmPassword, userType } = formData;

        if (!firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!password.trim()) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!userType) {
            newErrors.userType = 'Please select a user type';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const name = formData.firstName + ' ' + formData.lastName;

        if (validateForm()) {
            // In a real application, you would make an API call here to register the user
            signUp(formData.email, formData.password)

                .then((userCredential) => {
                    if (userCredential.user) {
                        profileUpdate(name)
                            .then((res) => {
                                setSuccessMessage('Registration successful! Please check your email to verify.');
                                setFormData({
                                    firstName: '',
                                    lastName: '',
                                    email: '',
                                    password: '',
                                    confirmPassword: '',
                                    userType: 'jobseeker',
                                });
                                setErrors({});
                                navigate('/')
                            })
                    }
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error('Error during registration:', errorCode, errorMessage);
                    Swal.fire({
                        icon: 'error',
                        title: 'Registration Failed',
                        text: errorMessage,
                    });
                });


        }
    };


    const handleGoogle = () => {

        googleSignIn()
            .then((result) => {
                const name = result.user.displayName;
                const photoURL = result.user.photoURL;

                profileUpdate(name, photoURL)
                    .then(res => {
                        setSuccessMessage('Google sign-in successful!');
                        navigate('/')
                    })

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Error during Google sign-in:', errorCode, errorMessage);
                Swal.fire({
                    icon: 'error',
                    title: 'Google Sign-In Failed',
                    text: errorMessage,
                });
            });
    }

    // const handleFacebook = () => {
    //     facebookSignIn()
    //         .then((result) => {
    //             const name = result.user.displayName;
    //             const photoURL = result.user.photoURL;

    //             profileUpdate(name, photoURL)
    //                 .then(res => {
    //                     setSuccessMessage('Facebook sign-in successful!');
    //                     navigate('/')
    //                 })

    //         })
    //         .catch((error) => {
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             console.error('Error during Facebook sign-in:', errorCode, errorMessage);
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'Facebook Sign-In Failed',
    //                 text: errorMessage,
    //             });
    //         });
    // }   


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                        Sign Up for Your Dream Job
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{' '}
                        <Link to={'/login'} className="font-medium text-indigo-600 hover:text-indigo-500">
                            login to your account
                        </Link>
                    </p>
                </div>

                {successMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">{successMessage}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                            First Name
                        </label>
                        <input
                            className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm  border border-gray-300 "
                            id="firstName"
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                            Last Name
                        </label>
                        <input
                            className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm  border border-gray-300"
                            id="lastName"
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                        {errors.lastName && <p className="text-red-500 text-xs italic">{errors.lastName}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm  border border-gray-300"
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm  border border-gray-300"
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm  border border-gray-300"
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Register As:
                        </label>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="jobseeker"
                                name="userType"
                                value="jobseeker"
                                checked={formData.userType === 'jobseeker'}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <label htmlFor="jobseeker" className="text-gray-700 text-sm mr-4">Job Seeker</label>

                            <input
                                type="radio"
                                id="employer"
                                name="userType"
                                value="employer"
                                checked={formData.userType === 'employer'}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <label htmlFor="employer" className="text-gray-700 text-sm">Employer</label>
                        </div>
                        {errors.userType && <p className="text-red-500 text-xs italic">{errors.userType}</p>}
                    </div>

                    {/* Social Logins */}
                    <div className="lg:flex justify-between  gap-4
                    ">
                        <button onClick={handleGoogle} className="flex items-center justify-center w-full py-2 border rounded-lg hover:bg-gray-100 transition cursor-pointer">
                            <FcGoogle
                                className="mr-2 text-2xl" />
                            Sign in with Google
                        </button>
                        <button className="flex items-center justify-center w-full py-2 border rounded-lg hover:bg-gray-100 transition cursor-pointer lg:mt-0 mt-4">
                            <FaFacebook className="mr-2 text-blue-500 text-2xl" />
                            Sign in with Facebook
                        </button>
                    </div>
                    <br />
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                            type="submit"
                        >
                            Sing Up
                        </button>
                        {/* You can add a link to login here if needed */}
                        {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
              Already have an account?
            </a> */}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;