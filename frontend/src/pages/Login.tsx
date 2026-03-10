import React from 'react'
import LoginForm from '../components/forms/LoginForm'

const Login = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 flex flex-col justify-center px-6">
                <div className="w-full max-w-sm mx-auto shadow-xl rounded-lg px-6 py-5 font-mono">
                    <h2 className="text-3xl font-bold text-black mb-8 text-center">
                        Welcome back
                    </h2>
                    <LoginForm />
                </div>
            </main>
        </div>
    )
}

export default Login