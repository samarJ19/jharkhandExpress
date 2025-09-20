import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import React from "react";
import {
    Compass,
    Feather,
    Box,
    ChevronLeft,
    ChevronRight,
    Menu,
    X,
    // Palette,    
    Star,
    Users,
    MessageSquare,
} from "lucide-react";

// --- THEME DATA AND TYPES ---
type ThemeVars = {
    [key: string]: string;
};

type Themes = {
    [key: string]: ThemeVars;
};

const themes: Themes = {
    sunset: {
        "--color-primary-light": "#fef3c7",
        "--color-primary-medium": "#f59e0b",
        "--color-primary-dark": "#b45309",
        "--color-primary-darker": "#78350f",
        "--color-accent": "#f59e0b",
        "--color-background": "#fffbeb",
        "--color-surface": "#f7fafc",
        "--color-text-base": "#374151",
        "--color-text-muted": "#6b7280",
        "--color-text-inverted": "#ffffff",
    },
    forest: {
        "--color-primary-light": "#ccfbf1",
        "--color-primary-medium": "#14b8a6",
        "--color-primary-dark": "#0f766e",
        "--color-primary-darker": "#134e4a",
        "--color-accent": "#10b981",
        "--color-background": "#f0fdfa",
        "--color-surface": "#f8fafc",
        "--color-text-base": "#1f2937",
        "--color-text-muted": "#4b5563",
        "--color-text-inverted": "#ffffff",
    },
    riverstone: {
        "--color-primary-light": "#e0f2fe",
        "--color-primary-medium": "#38bdf8",
        "--color-primary-dark": "#0369a1",
        "--color-primary-darker": "#0c4a6e",
        "--color-accent": "#60a5fa",
        "--color-background": "#f0f9ff",
        "--color-surface": "#f8fafc",
        "--color-text-base": "#1e293b",
        "--color-text-muted": "#475569",
        "--color-text-inverted": "#ffffff",
    },
};

// --- ICONS ---
const CompassIcon = () => (
    <Compass
        className="h-14 w-14 text-[var(--color-primary-dark)]"
        strokeWidth={1.5}
    />
);
const CultureIcon = () => (
    <Feather
        className="h-14 w-14 text-[var(--color-primary-dark)]"
        strokeWidth={1.5}
    />
);
const MarketIcon = () => (
    <Box
        className="h-14 w-14 text-[var(--color-primary-dark)]"
        strokeWidth={1.5}
    />
);

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 bg-[var(--color-primary-medium)] text-white p-4 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500"
                aria-label="Toggle Chatbot"
            >
                {isOpen ? (
                    <X className="w-8 h-8" />
                ) : (
                    <MessageSquare className="w-6 h-6" />
                )}
            </button>

            <div
                className={`fixed bottom-24 right-6 z-40 w-[400px] h-[600px] transition-transform duration-500 ease-in-out ${
                    isOpen ? "translate-x-0" : "translate-x-[450px]"
                }`}
            >
                <iframe
                    src="https://cdn.botpress.cloud/webchat/v3.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/09/20/05/20250920055748-BLE7GZDO.json"
                    className="w-full h-full border-none rounded-2xl shadow-2xl bg-white"
                    title="Jharkhand Express Chatbot"
                ></iframe>
            </div>
        </>
    );
};

export default function Home() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // const [theme, setTheme] = useState("forest");

    // Typing animation state
    const [text, setText] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    // Slideshow state
    const [currentSlide, setCurrentSlide] = useState(0);
    const backgroundImages = [
        "/Homepageback.jpg",
        "/Homepageback3.jpeg",
        "/Homepageback2.jpg",
    ];

    const wordsToRotate = [
        "ancient tribal heritage.",
        "majestic waterfalls.",
        "pristine forests.",
    ];
    const typingSpeed = 150;
    const deletingSpeed = 75;
    const delay = 2000;

    useEffect(() => {
        const handleTyping = () => {
            const currentWord = wordsToRotate[wordIndex];
            const updatedText = isDeleting
                ? currentWord.substring(0, text.length - 1)
                : currentWord.substring(0, text.length + 1);

            setText(updatedText);

            if (!isDeleting && updatedText === currentWord) {
                setTimeout(() => setIsDeleting(true), delay);
            } else if (isDeleting && updatedText === "") {
                setIsDeleting(false);
                setWordIndex(
                    (prevIndex) => (prevIndex + 1) % wordsToRotate.length
                );
            }
        };

        const timeout = setTimeout(
            handleTyping,
            isDeleting ? deletingSpeed : typingSpeed
        );
        return () => clearTimeout(timeout);
    }, [text, isDeleting, wordIndex]);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
        }, 5000);
        return () => clearInterval(slideInterval);
    }, []);

    const destinations = [
        {
            name: "Patratu Valley",
            image: "/Patratu.jpg",
            description: "A stunning valley with pristine beauty",
        },
        {
            name: "Netarhat",
            image: "/Netarhat Jharkhand.jpg",
            description: "The Queen of Chotanagpur",
        },
        {
            name: "Dassam Falls",
            image: "/dassam falls.jpg",
            description: "Magnificent cascading waterfall",
        },
        {
            name: "Jagannath Temple",
            image: "/Jagannath Temple.jpg",
            description: "Ancient spiritual heritage",
        },
        {
            name: "Baidyanath Dham",
            image: "/Baidyanath Dham.jpg",
            description: "Sacred pilgrimage site",
        },
        {
            name: "Betla National Park",
            image: "/Betla National Park.jpg",
            description: "Wildlife sanctuary and nature reserve",
        },
        {
            name: "Jonha Falls",
            image: "/Jonha Falls.jpg",
            description: "Picturesque hanging valley falls",
        },
        {
            name: "Parasnath Hills",
            image: "/Parasnath Hill.jpg",
            description: "Jain pilgrimage site and highest peak of Jharkhand",
        },
        {
            name: "Ranchi Hill & Pahari Mandir",
            image: "/Ranchi Hill and Pahari Mandir.avif",
            description: "Hilltop temple offering panoramic views of Ranchi",
        },
        {
            name: "Hundru Falls",
            image: "/hundru.jpg",
            description: "One of Ranchi's most famous waterfalls",
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () =>
        setCurrentIndex((i) => (i === 0 ? destinations.length - 1 : i - 1));
    const nextSlide = () =>
        setCurrentIndex((i) => (i === destinations.length - 1 ? 0 : i + 1));

    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 4000);
        return () => clearInterval(slideInterval);
    }, [currentIndex]);

    const handleStartExploring = () => navigate("/chat");

    // const ThemeSwitcher = () => {
    //     const cycleTheme = () => {
    //         const themeNames = Object.keys(themes);
    //         const currentThemeIndex = themeNames.indexOf(theme);
    //         const nextThemeIndex = (currentThemeIndex + 1) % themeNames.length;
    //         setTheme(themeNames[nextThemeIndex]);
    //     };
    //     return (
    //         <button
    //             onClick={cycleTheme}
    //             className="fixed bottom-5 right-5 z-50 bg-[var(--color-primary-medium)] text-[var(--color-text-inverted)] p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:bg-[var(--color-primary-dark)] hover:scale-110 active:scale-95"
    //             aria-label="Switch color theme"
    //         >
    //             <Palette />
    //         </button>
    //     );
    // };

    return (
        <div
            style={themes["forest"] as React.CSSProperties}
            className="bg-[var(--color-background)] font-serif"
        >
            {/* <ThemeSwitcher /> */}
            <header className="absolute top-0 left-0 w-full z-50 transition-all duration-300">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <Link to="/" className="flex items-center space-x-3">
                            <h1 className="text-2xl font-bold text-white tracking-wide">
                                Jharkhand Express
                            </h1>
                        </Link>
                        <nav className="hidden lg:flex items-center space-x-6">
                            <a
                                href="#experiences"
                                className="text-white/80 hover:text-white transition-colors duration-300 font-medium"
                            >
                                Experiences
                            </a>
                            <a
                                href="#destinations"
                                className="text-white/80 hover:text-white transition-colors duration-300 font-medium"
                            >
                                Destinations
                            </a>
                            <a
                                href="#treasure"
                                className="text-white/80 hover:text-white transition-colors duration-300 font-medium"
                            >
                                Treasure
                            </a>
                            <a
                                href="#reviews"
                                className="text-white/80 hover:text-white transition-colors duration-300 font-medium"
                            >
                                Reviews
                            </a>
                            <div className="flex items-center space-x-2 pl-4 border-l border-white/20">
                                <Link
                                    to="/publicTourGuides"
                                    className="text-white hover:text-[var(--color-primary-light)] transition-colors font-medium"
                                >
                                    For Guides
                                </Link>
                                <Link
                                    to="/admin"
                                    className="text-white/80 hover:text-white border border-white/30 rounded-full py-2 px-5 transition-all duration-300 hover:bg-white/10 text-sm"
                                >
                                    Admin
                                </Link>
                            </div>
                        </nav>
                        <button
                            className="lg:hidden text-white p-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                    {isMenuOpen && (
                        <div className="lg:hidden mt-4 bg-black/90 backdrop-blur-sm rounded-lg p-4">
                            <div className="flex flex-col space-y-3">
                                <a
                                    href="#experiences"
                                    className="text-white hover:text-[var(--color-primary-light)] transition-colors font-medium"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Experiences
                                </a>
                                <a
                                    href="#destinations"
                                    className="text-white hover:text-[var(--color-primary-light)] transition-colors font-medium"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Destinations
                                </a>
                                <a
                                    href="#treasure"
                                    className="text-white hover:text-[var(--color-primary-light)] transition-colors font-medium"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Treasure
                                </a>
                                <a
                                    href="#reviews"
                                    className="text-white hover:text-[var(--color-primary-light)] transition-colors font-medium"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Reviews
                                </a>
                                <Link
                                    to="/guide-registration"
                                    className="text-white hover:text-[var(--color-primary-light)] transition-colors font-medium border-t border-white/20 pt-3 mt-2"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    For Guides
                                </Link>
                                <Link
                                    to="/admin"
                                    className="text-white hover:text-[var(--color-primary-light)] transition-colors font-medium"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Admin Sign-In
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
                <div
                    className="absolute inset-0 w-full h-full flex transition-transform duration-1000 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {backgroundImages.map((img) => (
                        <div
                            key={img}
                            className="w-full h-full flex-shrink-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${img})` }}
                        />
                    ))}
                </div>
                <div className="absolute inset-0 bg-black/60"></div>

                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 drop-shadow-2xl bg-gradient-to-r from-white to-[var(--color-primary-light)] bg-clip-text text-transparent animate-fade-in-down">
                        Johar, Jharkhand!
                    </h1>
                    <p className="text-lg md:text-2xl mb-10 max-w-3xl mx-auto drop-shadow-lg leading-relaxed text-gray-200 h-10 animate-fade-in-down animation-delay-300">
                        Embark on a journey through{" "}
                        <span className="font-semibold text-[var(--color-primary-light)] border-r-2 border-r-[var(--color-primary-light)] animate-pulse">
                            {text}
                        </span>
                    </p>
                    <div className="animate-fade-in-up animation-delay-600">
                        <button
                            onClick={handleStartExploring}
                            className="group bg-gradient-to-r from-[var(--color-primary-medium)] to-[var(--color-accent)] hover:from-[var(--color-accent)] hover:to-[var(--color-primary-medium)] text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-2xl hover:shadow-[var(--color-primary-medium)]/25 flex items-center space-x-2 mx-auto"
                        >
                            <span>Start Exploring</span>
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </section>

            <style>{`
                @keyframes fade-in-down {
                    0% {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes fade-in-up {
                    0% {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animation-delay-300 {
                    animation-delay: 300ms;
                }
                .animation-delay-600 {
                    animation-delay: 600ms;
                }
                .animate-fade-in-down {
                    animation: fade-in-down 0.8s ease-out forwards;
                    opacity: 0;
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                    opacity: 0;
                }
            `}</style>

            <section
                id="experiences"
                className="py-24 bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-background)]"
            >
                <div className="container mx-auto text-center px-6">
                    <div className="mb-16">
                        <span className="inline-block bg-[var(--color-primary-light)] text-[var(--color-primary-dark)] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            Why Choose Us
                        </span>
                        <h2 className="text-4xl lg:text-5xl font-bold text-[var(--color-text-base)] mb-6">
                            Experience Jharkhand Like Never Before
                        </h2>
                        <p className="text-[var(--color-text-muted)] text-lg max-w-3xl mx-auto leading-relaxed">
                            We blend cutting-edge technology with deep cultural
                            knowledge to create personalized journeys that
                            connect you with the heart and soul of Jharkhand.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                        <div className="group bg-white p-8 lg:p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-stone-100">
                            <div className="mb-6 flex justify-center">
                                <div className="p-4 bg-gradient-to-br from-[var(--color-primary-light)] to-white rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                    <CompassIcon />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-[var(--color-text-base)] mb-4">
                                AI-Powered Itinerary
                            </h3>
                            <p className="text-[var(--color-text-muted)] leading-relaxed">
                                Our intelligent system analyzes your preferences
                                to create personalized itineraries that capture
                                the essence of Jharkhand.
                            </p>
                        </div>

                        <div className="group bg-white p-8 lg:p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-stone-100">
                            <div className="mb-6 flex justify-center">
                                <div className="p-4 bg-gradient-to-br from-[var(--color-primary-light)] to-white rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                    <CultureIcon />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-[var(--color-text-base)] mb-4">
                                Authentic Cultural Immersion
                            </h3>
                            <p className="text-[var(--color-text-muted)] leading-relaxed">
                                Connect deeply with Jharkhand's rich tribal
                                heritage through carefully curated experiences.
                            </p>
                        </div>

                        <div className="group bg-white p-8 lg:p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-stone-100">
                            <div className="mb-6 flex justify-center">
                                <div className="p-4 bg-gradient-to-br from-[var(--color-primary-light)] to-white rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                    <MarketIcon />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-[var(--color-text-base)] mb-4">
                                Support Local Artisans
                            </h3>
                            <p className="text-[var(--color-text-muted)] leading-relaxed">
                                Your journey contributes to preserving
                                traditional crafts and supporting local
                                livelihoods.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section
                id="destinations"
                className="py-24 bg-gradient-to-b from-[var(--color-background)] to-[var(--color-surface)] overflow-hidden"
            >
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <span className="inline-block bg-[var(--color-primary-dark)] text-[var(--color-primary-light)] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            Featured Destinations
                        </span>
                        <h2 className="text-4xl lg:text-5xl font-bold text-[var(--color-text-base)] mb-6">
                            Discover Jharkhand's Treasures
                        </h2>
                        <p className="text-[var(--color-text-muted)] text-lg max-w-2xl mx-auto">
                            From mystical waterfalls to ancient temples, explore
                            the diverse landscapes and rich cultural heritage of
                            Jharkhand.
                        </p>
                    </div>

                    <div className="relative flex items-center justify-center h-[600px] max-w-7xl mx-auto">
                        <div className="relative w-full h-full flex items-center justify-center">
                            {destinations.map((destination, index) => {
                                const totalItems = destinations.length;
                                let offset = index - currentIndex;
                                if (offset > totalItems / 2)
                                    offset -= totalItems;
                                if (offset < -totalItems / 2)
                                    offset += totalItems;

                                let transform = "",
                                    opacity = 0,
                                    zIndex = 0,
                                    scale = 0.6,
                                    blur = 8;

                                if (Math.abs(offset) <= 2) {
                                    opacity = 1;
                                    if (offset === 0) {
                                        scale = 1;
                                        zIndex = 30;
                                        blur = 0;
                                        transform = `translateX(0%) scale(${scale})`;
                                    } else if (Math.abs(offset) === 1) {
                                        scale = 0.8;
                                        zIndex = 20;
                                        blur = 2;
                                        const xPos = offset * 70;
                                        transform = `translateX(${xPos}%) scale(${scale})`;
                                        opacity = 0.8;
                                    } else if (Math.abs(offset) === 2) {
                                        scale = 0.6;
                                        zIndex = 10;
                                        blur = 4;
                                        const xPos = offset * 50;
                                        transform = `translateX(${xPos}%) scale(${scale})`;
                                        opacity = 0.4;
                                    }
                                }

                                return (
                                    <div
                                        key={`${destination.name}-${index}`}
                                        className="absolute transition-all duration-700 ease-out cursor-pointer"
                                        style={{
                                            transform,
                                            opacity,
                                            zIndex,
                                            filter: `blur(${blur}px)`,
                                            width: "400px",
                                            height: "500px",
                                        }}
                                        onClick={() => setCurrentIndex(index)}
                                    >
                                        <div className="relative w-full h-full group">
                                            <img
                                                src={destination.image}
                                                alt={destination.name}
                                                className="w-full h-full object-cover rounded-3xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-3xl"></div>
                                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                                <h3 className="text-white text-2xl md:text-3xl font-bold drop-shadow-lg mb-2">
                                                    {destination.name}
                                                </h3>
                                                <p className="text-white/90 text-base leading-relaxed">
                                                    {destination.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 bg-white/90 hover:bg-white rounded-full p-4 text-gray-800 transition-all shadow-xl hover:scale-110 backdrop-blur-sm"
                            aria-label="Previous image"
                        >
                            <ChevronLeft />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 bg-white/90 hover:bg-white rounded-full p-4 text-gray-800 transition-all shadow-xl hover:scale-110 backdrop-blur-sm"
                            aria-label="Next image"
                        >
                            <ChevronRight />
                        </button>
                    </div>
                </div>
            </section>

            {/* JHarkhands Treasure */}
            <section
                id="treasure"
                className="py-24 bg-gradient-to-b from-[var(--color-background)] to-[var(--color-surface)]"
            >
                <div className="container mx-auto text-center px-6">
                    <div className="mb-4">
                        <span className="inline-block bg-[var(--color-primary-light)] text-[var(--color-primary-dark)] px-4 py-2 rounded-full text-sm font-semibold">
                            Local Culture & Crafts
                        </span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-[var(--color-text-base)] mb-6 max-w-3xl mx-auto">
                        Explore Jharkhand's Treasures
                    </h2>
                    <p className="text-[var(--color-text-muted)] text-lg max-w-2xl mx-auto mb-10">
                        Discover a vibrant marketplace of authentic tribal
                        handicrafts, book unique homestays, and find cultural
                        events that offer a true taste of Jharkhand's rich
                        heritage.
                    </p>
                    <Link to="/jharkhand-treasures">
                        <button className="group bg-gradient-to-r from-[var(--color-primary-medium)] to-[var(--color-accent)] hover:from-[var(--color-accent)] hover:to-[var(--color-primary-medium)] text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-xl">
                            Explore the Marketplace
                        </button>
                    </Link>
                </div>
            </section>

            {/* Tourist Registration Section */}
            <section
                id="registerguide"
                className="py-24 bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-background)]"
            >
                <div className="container mx-auto px-6">
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                        <div className="grid lg:grid-cols-2 items-center">
                            <div className="p-12 lg:p-16">
                                <div className="mb-4">
                                    <span className="inline-block bg-[var(--color-primary-light)] text-[var(--color-primary-dark)] px-4 py-2 rounded-full text-sm font-semibold">
                                        Join Our Community
                                    </span>
                                </div>
                                <h2 className="text-4xl lg:text-5xl font-bold text-[var(--color-text-base)] mb-6">
                                    Become a Registered Tourist
                                </h2>
                                <p className="text-[var(--color-text-muted)] text-lg mb-8 leading-relaxed">
                                    Register as a tourist to unlock exclusive
                                    benefits, connect with certified local tour
                                    guides, and get access to personalized
                                    travel recommendations tailored just for
                                    you.
                                </p>
                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-6 h-6 bg-[var(--color-primary-medium)] rounded-full flex items-center justify-center">
                                            <Star className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="text-[var(--color-text-base)]">
                                            Access exclusive cultural
                                            experiences
                                        </span>
                                    </div>
                                </div>
                                <Link to="/tourGuideRegistration">
                                    <button className="group bg-gradient-to-r from-[var(--color-primary-medium)] to-[var(--color-accent)] hover:from-[var(--color-accent)] hover:to-[var(--color-primary-medium)] text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-xl flex items-center space-x-2">
                                        <Users className="w-5 h-5" />
                                        <span>Register as Tourist</span>
                                    </button>
                                </Link>
                            </div>
                            <div className="h-96 lg:h-full">
                                <img
                                    src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80"
                                    alt="Tourist exploring nature"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section
                id="reviews"
                className="py-24 bg-gradient-to-b from-white to-[var(--color-surface)]"
            >
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="inline-block bg-[var(--color-primary-light)] text-[var(--color-primary-dark)] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            Traveler Stories
                        </span>
                        <h2 className="text-4xl font-bold text-[var(--color-text-base)] mb-6">
                            What Our Explorers Say
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-stone-100 hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-[var(--color-primary-light)] rounded-full flex items-center justify-center">
                                    <span className="text-[var(--color-primary-dark)] font-bold">
                                        R
                                    </span>
                                </div>
                                <div className="ml-4">
                                    <h4 className="font-semibold text-[var(--color-text-base)]">
                                        Rahul Sharma
                                    </h4>
                                    <p className="text-[var(--color-text-muted)] text-sm">
                                        Photography Enthusiast
                                    </p>
                                </div>
                            </div>
                            <p className="text-[var(--color-text-muted)] italic leading-relaxed">
                                "The AI-powered itinerary was spot-on! It
                                recommended hidden waterfalls I never would have
                                found otherwise. Jharkhand's beauty exceeded all
                                expectations."
                            </p>
                            <div className="flex text-[var(--color-accent)] mt-4">
                                <span>★★★★★</span>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-stone-100 hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-[var(--color-primary-light)] rounded-full flex items-center justify-center">
                                    <span className="text-[var(--color-primary-dark)] font-bold">
                                        P
                                    </span>
                                </div>
                                <div className="ml-4">
                                    <h4 className="font-semibold text-[var(--color-text-base)]">
                                        Priya Patel
                                    </h4>
                                    <p className="text-[var(--color-text-muted)] text-sm">
                                        Cultural Explorer
                                    </p>
                                </div>
                            </div>
                            <p className="text-[var(--color-text-muted)] italic leading-relaxed">
                                "Connecting with local artisans was the
                                highlight of my trip. The platform made it easy
                                to support communities while experiencing
                                authentic culture."
                            </p>
                            <div className="flex text-[var(--color-accent)] mt-4">
                                <span>★★★★★</span>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-stone-100 hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-[var(--color-primary-light)] rounded-full flex items-center justify-center">
                                    <span className="text-[var(--color-primary-dark)] font-bold">
                                        A
                                    </span>
                                </div>
                                <div className="ml-4">
                                    <h4 className="font-semibold text-[var(--color-text-base)]">
                                        Arjun Singh
                                    </h4>
                                    <p className="text-[var(--color-text-muted)] text-sm">
                                        Adventure Seeker
                                    </p>
                                </div>
                            </div>
                            <p className="text-[var(--color-text-muted)] italic leading-relaxed">
                                "From trekking in Netarhat to exploring tribal
                                villages, every moment was perfectly planned.
                                The AI really understands what adventure lovers
                                want!"
                            </p>
                            <div className="flex text-[var(--color-accent)] mt-4">
                                <span>★★★★★</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-primary-medium)] to-[var(--color-accent)] rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">
                                        J
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold">
                                    Jharkhand Express
                                </h3>
                            </div>
                            <p className="text-gray-400 leading-relaxed">
                                Your gateway to authentic Jharkhand experiences,
                                powered by AI and rooted in local culture.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4 text-[var(--color-primary-light)]">
                                Explore
                            </h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <Link
                                        to="/"
                                        className="hover:text-white transition-colors"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/jharkhand-treasures"
                                        className="hover:text-white transition-colors"
                                    >
                                        Treasures
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        href="#destinations"
                                        className="hover:text-white transition-colors"
                                    >
                                        Destinations
                                    </a>
                                </li>
                                <li>
                                    <Link
                                        to="/publicTourGuides"
                                        className="hover:text-white transition-colors"
                                    >
                                        Tour Guides
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4 text-[var(--color-primary-light)]">
                                For Officials
                            </h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <Link
                                        to="/admin"
                                        className="hover:text-white transition-colors"
                                    >
                                        Admin Login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/tourist-registration"
                                        className="hover:text-white transition-colors"
                                    >
                                        Tourist Registration
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Help Center
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4 text-[var(--color-primary-light)]">
                                Connect
                            </h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Newsletter
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Social Media
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                        <p>
                            &copy; 2024 Jharkhand Express. All rights reserved.
                            | Made with ❤️ for Jharkhand
                        </p>
                    </div>
                </div>
            </footer>
            <Chatbot></Chatbot>
        </div>
    );
}
