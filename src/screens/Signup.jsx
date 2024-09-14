import Swal from 'sweetalert2';
import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../database/firebase.cnfig'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const Navigate = useNavigate()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setisLoading] = useState(false);

    function handleSignup(e) {
        setisLoading(true)
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (response) => {
                // Signed up 
                const uid = response.user.uid
                const userData = {name, email, uid}
                localStorage.setItem("userid" , uid)
                await setDoc(doc(db, "users", uid), userData)
                Swal.fire('SignUp Completed!')
                Navigate('/home')
                setisLoading(false)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Swal.fire({
                    title: 'SomeThing Went Wrong!',
                    text: errorMessage,
                    icon: 'error',
                    confirmButtonText: 'Okay!'
                })
                setisLoading(false)
            });

    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-2xl rounded-lg scale-105">
                <h2 className="text-2xl font-bold text-center text-gray-800">Signup</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Fullname
                        </label>
                        <input
                            type='text'
                            required
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter Your Name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type='email'
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="********"
                        />
                    </div>
                    <div className='flex items-center justify-between'>
                        {isLoading ?
                            <div className="w-full flex justify-center px-4 py-2 rounded-lg">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif" className='h-6 w-6' />
                            </div> : <button
                                type="submit"
                                onClick={handleSignup}
                                className="w-full px-4 py-2 font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
                            >
                                Sign Up
                            </button>}
                    </div>
                </form>
                <p className="text-sm text-center text-gray-600">
                    Already have an Account ?<a onClick={()=> Navigate("/login")} className="text-blue-500 cursor-pointer font-semibold hover:underline">Log In</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
