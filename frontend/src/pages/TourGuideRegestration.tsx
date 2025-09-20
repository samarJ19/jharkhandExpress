import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    KeyRound,
    Mail,
    UserPlus,
    FileText,
    Shield,
    Clock,
    CheckCircle,
    XCircle,
    Loader,
    Search,
    ArrowRight,
    AlertCircle,
    X,
} from "lucide-react";

const TourGuideRegistration: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<"register" | "check">(
        "register"
    );
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [generatedId, setGeneratedId] = useState("");
    const [statusId, setStatusId] = useState("");
    const [verificationStatus, setVerificationStatus] = useState<
        "idle" | "pending" | "verified" | "rejected" | "notFound"
    >("idle");
    const [isChecking, setIsChecking] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Form data state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        walletAddress: ""
    });
    
    // Dialog state
    const [dialog, setDialog] = useState<{
        show: boolean;
        type: 'success' | 'error';
        title: string;
        message: string;
    }>({
        show: false,
        type: 'success',
        title: '',
        message: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const showDialog = (type: 'success' | 'error', title: string, message: string) => {
        setDialog({
            show: true,
            type,
            title,
            message
        });
    };

    const closeDialog = () => {
        setDialog(prev => ({ ...prev, show: false }));
    };

    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('http://localhost:5000/api/admin/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    walletAddress: formData.walletAddress,
                    role: "GUIDE" // GUIDE role from enum
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Success
                setGeneratedId(data.user.id);
                showDialog(
                    'success',
                    'Registration Successful!',
                    `Your application has been submitted. Your ID is: ${data.user.id}`
                );
                setIsSubmitted(true);
                
                // Reset form
                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    walletAddress: ""
                });

                // Redirect home after a delay
                setTimeout(() => {
                    navigate("/");
                }, 5000);
            } else {
                // Error from server
                showDialog(
                    'error',
                    'Registration Failed',
                    data.message || 'An error occurred during registration'
                );
            }
        } catch (error) {
            // Network or other error
            showDialog(
                'error',
                'Connection Error',
                'Unable to connect to the server. Please try again later.'
            );
            console.error('Registration error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleStatusCheck = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsChecking(true);
        setVerificationStatus("idle");

        try {
            const response = await fetch(`http://localhost:5000/api/admin/guide/${statusId}/status`);
            const data = await response.json();

            if (response.ok) {
                if (data.verified) {
                    setVerificationStatus("verified");
                } else {
                    setVerificationStatus("pending");
                }
            } else {
                if (response.status === 404) {
                    setVerificationStatus("notFound");
                } else {
                    showDialog(
                        'error',
                        'Status Check Failed',
                        data.message || 'Unable to check status'
                    );
                }
            }
        } catch (error) {
            showDialog(
                'error',
                'Connection Error',
                'Unable to connect to the server. Please try again later.'
            );
            console.error('Status check error:', error);
        } finally {
            setIsChecking(false);
        }
    };

    const StatusResult = () => {
        switch (verificationStatus) {
            case "verified":
                return (
                    <div className="mt-4 flex items-center p-4 rounded-lg bg-green-500/20 text-green-300 border border-green-400/30">
                        <CheckCircle className="w-6 h-6 mr-3 text-green-400" />
                        <div>
                            <h4 className="font-bold">Status: Verified</h4>
                            <p className="text-sm">
                                Congratulations! Your profile is approved and
                                live.
                            </p>
                        </div>
                    </div>
                );
            case "rejected":
                return (
                    <div className="mt-4 flex items-center p-4 rounded-lg bg-red-500/20 text-red-300 border border-red-400/30">
                        <XCircle className="w-6 h-6 mr-3 text-red-400" />
                        <div>
                            <h4 className="font-bold">Status: Rejected</h4>
                            <p className="text-sm">
                                Unfortunately, your application was not approved
                                at this time.
                            </p>
                        </div>
                    </div>
                );
            case "pending":
                return (
                    <div className="mt-4 flex items-center p-4 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-400/30">
                        <Clock className="w-6 h-6 mr-3 text-amber-400" />
                        <div>
                            <h4 className="font-bold">
                                Status: Pending Review
                            </h4>
                            <p className="text-sm">
                                Your application is submitted and will be
                                reviewed shortly.
                            </p>
                        </div>
                    </div>
                );
            case "notFound":
                return (
                    <div className="mt-4 flex items-center p-4 rounded-lg bg-slate-700/50 text-slate-300 border border-slate-600/50">
                        <Search className="w-6 h-6 mr-3 text-slate-400" />
                        <div>
                            <h4 className="font-bold">Not Found</h4>
                            <p className="text-sm">
                                We couldn't find a registration with that ID.
                            </p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    // Stylized Dialog Component
    const StylizedDialog = () => {
        if (!dialog.show) return null;

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
                <div className="bg-slate-800 border border-sky-500/50 rounded-2xl p-8 text-center text-white shadow-2xl max-w-lg mx-4 relative">
                    <button
                        onClick={closeDialog}
                        className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    
                    <div className="mb-4">
                        {dialog.type === 'success' ? (
                            <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
                        ) : (
                            <AlertCircle className="w-16 h-16 text-red-400 mx-auto" />
                        )}
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-2">{dialog.title}</h2>
                    <p className="text-slate-300 mb-6">{dialog.message}</p>
                    
                    <button
                        onClick={closeDialog}
                        className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                            dialog.type === 'success'
                                ? 'bg-green-500 hover:bg-green-600 text-white'
                                : 'bg-red-500 hover:bg-red-600 text-white'
                        }`}
                    >
                        Close
                    </button>
                </div>
            </div>
        );
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

            <StylizedDialog />

            {isSubmitted && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-md">
                    <div className="bg-slate-800 border border-sky-500/50 rounded-2xl p-8 text-center text-white shadow-2xl max-w-lg mx-4">
                        <CheckCircle className="w-16 h-16 text-sky-400 mx-auto mb-4" />
                        <h2 className="text-3xl font-bold mb-2">
                            Registration Successful!
                        </h2>
                        <p className="text-slate-300 mb-6">
                            Your application has been submitted for review.
                            Please save your Registration ID to check your
                            status later.
                        </p>
                        <div className="bg-slate-900/50 border border-dashed border-slate-600 rounded-lg p-4 mb-6">
                            <p className="text-sm text-slate-400">
                                Your Registration ID
                            </p>
                            <p className="text-2xl font-mono tracking-widest text-sky-300">
                                {generatedId}
                            </p>
                        </div>
                        <p className="text-xs text-slate-400">
                            You will be redirected to the homepage shortly.
                        </p>
                    </div>
                </div>
            )}

            <div className="relative z-10 w-full max-w-2xl">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-8 text-white">
                    <div className="relative flex justify-center mb-8 bg-slate-800/50 p-1 rounded-full border border-slate-700">
                        <div
                            className={`absolute top-1 bottom-1 left-1 w-1/2 bg-sky-500 rounded-full transition-transform duration-300 ease-in-out ${
                                activeTab === "check"
                                    ? "translate-x-full"
                                    : "translate-x-0"
                            }`}
                        ></div>
                        <button
                            onClick={() => setActiveTab("register")}
                            className="relative z-10 w-1/2 py-2 rounded-full transition-colors duration-300"
                        >
                            Register
                        </button>
                        <button
                            onClick={() => setActiveTab("check")}
                            className="relative z-10 w-1/2 py-2 rounded-full transition-colors duration-300"
                        >
                            Check Status
                        </button>
                    </div>

                    <div className="relative min-h-[480px] overflow-hidden">
                        {/* Registration Form */}
                        <div
                            className={`absolute top-0 left-0 w-full transition-all duration-500 ease-in-out ${
                                activeTab === "register"
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 -translate-x-full pointer-events-none"
                            }`}
                        >
                            <form
                                onSubmit={handleRegisterSubmit}
                                className="space-y-4"
                            >
                                <div className="text-center mb-6">
                                    <h2 className="text-2xl font-bold">
                                        Tour Guide Registration
                                    </h2>
                                    <p className="text-slate-300 text-sm">
                                        Join our network of certified guides
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                                placeholder="Your Name"
                                                required
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full bg-slate-800/50 border border-slate-600 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-slate-300 mb-2"
                                        >
                                            Email
                                        </label>
                                        <div className="relative">
                                            <Mail className="w-5 h-5 text-slate-400 absolute top-1/2 left-3 -translate-y-1/2" />
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="you@email.com"
                                                required
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full bg-slate-800/50 border border-slate-600 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium text-slate-300 mb-2"
                                        >
                                            Password
                                        </label>
                                        <div className="relative">
                                            <KeyRound className="w-5 h-5 text-slate-400 absolute top-1/2 left-3 -translate-y-1/2" />
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                placeholder="••••••••"
                                                required
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                className="w-full bg-slate-800/50 border border-slate-600 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="walletAddress"
                                            className="block text-sm font-medium text-slate-300 mb-2"
                                        >
                                            Wallet Address
                                        </label>
                                        <div className="relative">
                                            <Shield className="w-5 h-5 text-slate-400 absolute top-1/2 left-3 -translate-y-1/2" />
                                            <input
                                                id="walletAddress"
                                                name="walletAddress"
                                                type="text"
                                                placeholder="0x..."
                                                required
                                                value={formData.walletAddress}
                                                onChange={handleInputChange}
                                                className="w-full bg-slate-800/50 border border-slate-600 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-6">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full group bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader className="w-5 h-5 mr-2 animate-spin" />
                                                <span>Registering...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Register Now</span>
                                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Status Check Form */}
                        <div
                            className={`absolute top-0 left-0 w-full transition-all duration-500 ease-in-out ${
                                activeTab === "check"
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 translate-x-full pointer-events-none"
                            }`}
                        >
                            <form
                                onSubmit={handleStatusCheck}
                                className="space-y-6"
                            >
                                <div className="text-center mb-6">
                                    <h2 className="text-2xl font-bold">
                                        Check Application Status
                                    </h2>
                                    <p className="text-slate-300 text-sm">
                                        Enter your Registration ID below
                                    </p>
                                </div>
                                <div>
                                    <label
                                        htmlFor="statusId"
                                        className="block text-sm font-medium text-slate-300 mb-2"
                                    >
                                        Registration ID
                                    </label>
                                    <div className="relative">
                                        <FileText className="w-5 h-5 text-slate-400 absolute top-1/2 left-3 -translate-y-1/2" />
                                        <input
                                            id="statusId"
                                            type="text"
                                            placeholder="e.g., TG-ABC123XYZ"
                                            required
                                            value={statusId}
                                            onChange={(e) =>
                                                setStatusId(e.target.value)
                                            }
                                            className="w-full bg-slate-800/50 border border-slate-600 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isChecking}
                                    className="w-full group bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isChecking ? (
                                        <>
                                            <Loader className="w-5 h-5 mr-2 animate-spin" />{" "}
                                            Checking...
                                        </>
                                    ) : (
                                        <>
                                            <span>Check Status</span>
                                            <Search className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>

                                <div className="min-h-[96px]">
                                    <StatusResult />
                                </div>
                            </form>
                        </div>
                    </div>
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

export default TourGuideRegistration;
