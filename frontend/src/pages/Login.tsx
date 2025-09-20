import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShieldCheck, ArrowRight, User, KeyRound } from "lucide-react";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const handleAdminLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you'd have authentication logic here.
        navigate("/dashboard");
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
                    <div className="text-center mb-8">
                        <div className="inline-block bg-sky-500/20 p-4 rounded-full border border-sky-400/30">
                            <ShieldCheck className="w-12 h-12 text-sky-300" />
                        </div>
                        <h1 className="text-3xl font-bold mt-4">
                            Admin Access
                        </h1>
                        <p className="text-slate-300">
                            Jharkhand Tourism Analytics Platform
                        </p>
                    </div>

                    <form onSubmit={handleAdminLogin} className="space-y-6">
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
