import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { signupSchema } from "../../validation/auth.validation";

const SignupForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    async function onSubmit(data: z.infer<typeof signupSchema>) {
        try {
            const res = await axiosInstance.post("/api/v1/auth/signup", data);

            if (res.status === 200) {
                toast.success(res.data.msg);
                form.reset();
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.msg);
            }
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6">
                <div className="relative">
                    <label htmlFor="name" className="block mb-1 text-sm font-medium">
                        Full Name
                    </label>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                        </div>

                        <input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            {...form.register("name")}
                            className="w-full pl-10 pr-3 py-2 border-b-3 rounded focus:outline-none duration-200"
                        />
                    </div>

                    {form.formState.errors.name && (
                        <p className="text-red-500 text-xs mt-1">
                            {form.formState.errors.name.message}
                        </p>
                    )}
                </div>

                <div className="relative">
                    <label htmlFor="email" className="block mb-1 text-sm font-medium">
                        Email Address
                    </label>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>

                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            {...form.register("email")}
                            className="w-full pl-10 pr-3 py-2 border-b-3 rounded focus:outline-none duration-200"
                        />
                    </div>

                    {form.formState.errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                            {form.formState.errors.email.message}
                        </p>
                    )}
                </div>

                <div className="relative">
                    <label htmlFor="password" className="block mb-1 text-sm font-medium">
                        Password
                    </label>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </div>

                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            {...form.register("password")}
                            className="w-full pl-10 pr-10 py-2 border-b-3 rounded focus:outline-none duration-200"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                            {showPassword ? (
                                <Eye className="h-5 w-5 text-gray-400" />
                            ) : (
                                <EyeOff className="h-5 w-5 text-gray-400" />
                            )}
                        </button>
                    </div>

                    {form.formState.errors.password && (
                        <p className="text-red-500 text-xs mt-1">
                            {form.formState.errors.password.message}
                        </p>
                    )}
                </div>
            </div>

            <button className="group w-full px-3 py-3 bg-black text-white mt-5 rounded-lg flex items-center justify-center gap-3">
                Sign up
                <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-center mt-3 text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-[#009698] hover:underline transition">
                    Sign in here
                </Link>
            </p>
        </form>
    );
};

export default SignupForm;