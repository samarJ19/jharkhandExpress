import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    ShieldCheck,
    ArrowRight,
    User,
    KeyRound,
    Mail,
    UserPlus,
} from "lucide-react";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [authMode, setAuthMode] = useState<
        "userLogin" | "userSignup" | "adminLogin"
    >("userLogin");

    const handleAdminLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Admin authentication logic would go here
        navigate("/dashboard");
    };

    const handleUserLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // User authentication logic would go here
        navigate("/"); // Navigate to home after successful login
    };

    const handleUserSignup = (e: React.FormEvent) => {
        e.preventDefault();
        // User registration logic would go here
        navigate("/"); // Navigate to home after successful signup
    };

    return (
        <div
            className="min-h-screen bg-slate-900 flex items-center justify-center p-4"
            style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1542382257-80ded14b0ce7?w=1920&q=80')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"></div>
            <div className="relative z-10 w-full max-w-md">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-8 text-white">
                    <div className="relative flex justify-center mb-8 bg-slate-800/50 p-1 rounded-full border border-slate-700">
                        <div
                            className={`absolute top-1 bottom-1 left-1 w-1/2 bg-sky-500 rounded-full transition-transform duration-300 ease-in-out ${
                                authMode === "adminLogin"
                                    ? "translate-x-full"
                                    : "translate-x-0"
                            }`}
                        ></div>
                        <button
                            onClick={() => setAuthMode("userLogin")}
                            className="relative z-10 w-1/2 py-2 rounded-full transition-colors duration-300"
                        >
                            User
                        </button>
                        <button
                            onClick={() => setAuthMode("adminLogin")}
                            className="relative z-10 w-1/2 py-2 rounded-full transition-colors duration-300"
                        >
                            Admin
                        </button>
                    </div>

                    <div className="relative min-h-[450px] overflow-hidden">
                        {/* Admin Form */}
                        <div
                            className={`absolute top-0 left-0 w-full transition-all duration-500 ease-in-out ${
                                authMode === "adminLogin"
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 translate-x-full pointer-events-none"
                            }`}
                        >
                            <form
                                onSubmit={handleAdminLogin}
                                className="space-y-6"
                            >
                                <div className="text-center">
                                    <h2 className="text-2xl font-bold">
                                        Admin Access
                                    </h2>
                                    <p className="text-slate-300 text-sm">
                                        Tourism Analytics Platform
                                    </p>
                                </div>
                                <div>
                                    <label
                                        htmlFor="officialId"
                                        className="block text-sm font-medium text-slate-300 mb-2"
                                    >
                                        Official ID
                                    </label>
                                    <div className="relative">
                                        <User className="w-5 h-5 text-slate-400 absolute top-1/2 left-3 -translate-y-1/2" />
                                        <input
                                            id="officialId"
                                            name="officialId"
                                            type="text"
                                            placeholder="Enter your official ID"
                                            required
                                            className="w-full bg-slate-800/50 border border-slate-600 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="password-admin"
                                        className="block text-sm font-medium text-slate-300 mb-2"
                                    >
                                        Password
                                    </label>
                                    <div className="relative">
                                        <KeyRound className="w-5 h-5 text-slate-400 absolute top-1/2 left-3 -translate-y-1/2" />
                                        <input
                                            id="password-admin"
                                            name="password"
                                            type="password"
                                            placeholder="••••••••"
                                            required
                                            className="w-full bg-slate-800/50 border border-slate-600 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full group bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
                                >
                                    <span>Secure Login</span>
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        </div>

                        {/* User Forms Container */}
                        <div
                            className={`absolute top-0 right-0 w-full transition-all duration-500 ease-in-out ${
                                authMode !== "adminLogin"
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 -translate-x-full pointer-events-none"
                            }`}
                        >
                            <div className="relative w-full h-full">
                                {/* User Login Form */}
                                <div
                                    className={`absolute w-full transition-all duration-500 ease-in-out ${
                                        authMode === "userLogin"
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 -translate-y-full pointer-events-none"
                                    }`}
                                >
                                    <form
                                        onSubmit={handleUserLogin}
                                        className="space-y-6"
                                    >
                                        <div className="text-center">
                                            <h2 className="text-2xl font-bold">
                                                Welcome Back!
                                            </h2>
                                            <p className="text-slate-300 text-sm">
                                                Log in to continue your journey
                                            </p>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="email-login"
                                                className="block text-sm font-medium text-slate-300 mb-2"
                                            >
                                                Email Address
                                            </label>
                                            <div className="relative">
                                                <Mail className="w-5 h-5 text-slate-400 absolute top-1/2 left-3 -translate-y-1/2" />
                                                <input
                                                    id="email-login"
                                                    name="email"
                                                    type="email"
                                                    placeholder="you@example.com"
                                                    required
                                                    className="w-full bg-slate-800/50 border border-slate-600 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="password-login"
                                                className="block text-sm font-medium text-slate-300 mb-2"
                                            >
                                                Password
                                            </label>
                                            <div className="relative">
                                                <KeyRound className="w-5 h-5 text-slate-400 absolute top-1/2 left-3 -translate-y-1/2" />
                                                <input
                                                    id="password-login"
                                                    name="password"
                                                    type="password"
                                                    placeholder="••••••••"
                                                    required
                                                    className="w-full bg-slate-800/50 border border-slate-600 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full group bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
                                        >
                                            <span>Login</span>
                                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </form>
                                </div>

                                {/* User Signup Form */}
                                <div
                                    className={`absolute w-full transition-all duration-500 ease-in-out ${
                                        authMode === "userSignup"
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-full pointer-events-none"
                                    }`}
                                >
                                    <form
                                        onSubmit={handleUserSignup}
                                        className="space-y-6"
                                    >
                                        <div className="text-center">
                                            <h2 className="text-2xl font-bold">
                                                Create Account
                                            </h2>
                                            <p className="text-slate-300 text-sm">
                                                Join the Jharkhand Express
                                                community
                                            </p>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="name"
                                                className="block text-sm font-medium text-slate-300 mb-2"
                                            >
                                                Full Name
                                            </label>
                                            <div className="relative">
                                                <UserPlus className="w-5 h-5 text-slate-400 absolute top-1/2 left-3 -translate-y-1/2" />
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    placeholder="Enter your full name"
                                                    required
                                                    className="w-full bg-slate-800/50 border border-slate-600 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="email-signup"
                                                className="block text-sm font-medium text-slate-300 mb-2"
                                            >
                                                Email Address
                                            </label>
                                            <div className="relative">
                                                <Mail className="w-5 h-5 text-slate-400 absolute top-1/2 left-3 -translate-y-1/2" />
                                                <input
                                                    id="email-signup"
                                                    name="email"
                                                    type="email"
                                                    placeholder="you@example.com"
                                                    required
                                                    className="w-full bg-slate-800/50 border border-slate-600 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="password-signup"
                                                className="block text-sm font-medium text-slate-300 mb-2"
                                            >
                                                Password
                                            </label>
                                            <div className="relative">
                                                <KeyRound className="w-5 h-5 text-slate-400 absolute top-1/2 left-3 -translate-y-1/2" />
                                                <input
                                                    id="password-signup"
                                                    name="password"
                                                    type="password"
                                                    placeholder="••••••••"
                                                    required
                                                    className="w-full bg-slate-800/50 border border-slate-600 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full group bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
                                        >
                                            <span>Sign Up</span>
                                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    {authMode !== "adminLogin" && (
                        <p className="text-center text-sm text-slate-300 mt-6">
                            {authMode === "userLogin"
                                ? "Don't have an account? "
                                : "Already have an account? "}
                            <button
                                onClick={() =>
                                    setAuthMode(
                                        authMode === "userLogin"
                                            ? "userSignup"
                                            : "userLogin"
                                    )
                                }
                                className="font-semibold text-sky-400 hover:text-sky-300 transition-colors"
                            >
                                {authMode === "userLogin"
                                    ? "Sign Up"
                                    : "Log In"}
                            </button>
                        </p>
                    )}
                </div>
                <p className="text-center text-xs text-slate-400 mt-6">
                    <Link to="/" className="hover:text-white transition-colors">
                        &larr; Back to Home
                    </Link>{" "}
                    | © 2024 Jharkhand Express
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
