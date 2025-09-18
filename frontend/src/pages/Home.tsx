import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import React from "react";

// --- THEME DATA AND TYPES ---
type ThemeVars = {
    [key: string]: string;
};

type Themes = {
    [key: string]: ThemeVars;
};

const themes: Themes = {
    sunset: {
        "--color-primary-light": "#fef3c7", // amber-100
        "--color-primary-medium": "#f59e0b", // amber-500
        "--color-primary-dark": "#b45309", // amber-700
        "--color-primary-darker": "#78350f", // amber-900
        "--color-accent": "#f59e0b", // amber-500
        "--color-background": "#fffbeb", // amber-50
        "--color-surface": "#f7fafc", // stone-50
        "--color-text-base": "#374151", // gray-700
        "--color-text-muted": "#6b7280", // gray-500
        "--color-text-inverted": "#ffffff",
    },
    forest: {
        "--color-primary-light": "#ccfbf1", // teal-100
        "--color-primary-medium": "#14b8a6", // teal-500
        "--color-primary-dark": "#0f766e", // teal-700
        "--color-primary-darker": "#134e4a", // teal-900
        "--color-accent": "#10b981", // emerald-500
        "--color-background": "#f0fdfa", // teal-50
        "--color-surface": "#f8fafc", // slate-50
        "--color-text-base": "#1f2937", // gray-800
        "--color-text-muted": "#4b5563", // gray-600
        "--color-text-inverted": "#ffffff",
    },
    riverstone: {
        "--color-primary-light": "#e0f2fe", // sky-100
        "--color-primary-medium": "#38bdf8", // sky-500
        "--color-primary-dark": "#0369a1", // sky-700
        "--color-primary-darker": "#0c4a6e", // sky-900
        "--color-accent": "#60a5fa", // blue-400
        "--color-background": "#f0f9ff", // sky-50
        "--color-surface": "#f8fafc", // slate-50
        "--color-text-base": "#1e293b", // slate-800
        "--color-text-muted": "#475569", // slate-600
        "--color-text-inverted": "#ffffff",
    },
};

// --- ICONS ---
const CompassIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-14 w-14 text-[var(--color-primary-dark)]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
        />
    </svg>
);
const CultureIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-14 w-14 text-[var(--color-primary-dark)]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
        />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
        />
    </svg>
);
const MarketIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-14 w-14 text-[var(--color-primary-dark)]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
        />
    </svg>
);
const ChevronLeft = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
        />
    </svg>
);
const ChevronRight = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
);
const MenuIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
        />
    </svg>
);
const CloseIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
        />
    </svg>
);
const PaletteIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
    </svg>
);

export default function Home() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [theme, setTheme] = useState("forest"); // 'sunset', 'forest', 'riverstone'

    // Typing animation state
    const [text, setText] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const wordsToRotate = [
        "ancient tribal heritage",
        "majestic waterfalls",
        "pristine forests",
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

    // NOTE: The local image paths have been replaced with placeholders.
    // To use your own images, place them in the `public` folder of your project
    // and use a path like `/Your-Image-Name.jpg`. Avoid spaces in filenames.

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
    const handleStartPlanning = () => navigate("/chat");

    const ThemeSwitcher = () => {
        const cycleTheme = () => {
            const themeNames = Object.keys(themes);
            const currentThemeIndex = themeNames.indexOf(theme);
            const nextThemeIndex = (currentThemeIndex + 1) % themeNames.length;
            setTheme(themeNames[nextThemeIndex]);
        };
        return (
            <button
                onClick={cycleTheme}
                className="fixed bottom-5 right-5 z-50 bg-[var(--color-primary-medium)] text-[var(--color-text-inverted)] p-3 rounded-full shadow-lg hover:bg-[var(--color-primary-dark)] transition-all duration-300 transform hover:scale-110"
                aria-label="Switch color theme"
            >
                <PaletteIcon />
            </button>
        );
    };

    return (
        <div
            style={themes[theme] as React.CSSProperties}
            className="bg-[var(--color-background)] font-serif"
        >
            <ThemeSwitcher />
            {/* Simplified Header */}
            <header className="absolute top-0 left-0 w-full z-50 transition-all duration-300">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-primary-light)] to-[var(--color-primary-medium)] rounded-full flex items-center justify-center">
                                <span className="text-[var(--color-primary-darker)] font-bold text-lg">
                                    J
                                </span>
                            </div>
                            <h1 className="text-2xl font-bold text-white tracking-wide">
                                Jharkhand Express
                            </h1>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center space-x-8">
                            <a
                                href="#"
                                className="text-white hover:text-[var(--color-primary-light)] transition-all duration-300 font-medium relative group"
                            >
                                Home
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-primary-light)] transition-all duration-300 group-hover:w-full"></span>
                            </a>
                            <a
                                href="#destinations"
                                className="text-white hover:text-[var(--color-primary-light)] transition-all duration-300 font-medium relative group"
                            >
                                Destinations
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-primary-light)] transition-all duration-300 group-hover:w-full"></span>
                            </a>
                            <a
                                href="#experiences"
                                className="text-white hover:text-[var(--color-primary-light)] transition-all duration-300 font-medium relative group"
                            >
                                Experiences
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-primary-light)] transition-all duration-300 group-hover:w-full"></span>
                            </a>
                            <a
                                href="#about"
                                className="text-white hover:text-[var(--color-primary-light)] transition-all duration-300 font-medium relative group"
                            >
                                About
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-primary-light)] transition-all duration-300 group-hover:w-full"></span>
                            </a>
                            {/* <button
                                onClick={handleStartPlanning}
                                className="bg-gradient-to-r from-[var(--color-primary-medium)] to-[var(--color-accent)] hover:from-[var(--color-accent)] hover:to-[var(--color-primary-medium)] text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                Plan Your Journey
                            </button> */}
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden text-white p-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div className="lg:hidden absolute top-full left-0 right-0 mt-4">
                            <div className="mx-6 bg-black/30 backdrop-blur-md rounded-2xl shadow-xl">
                                <nav className="flex flex-col p-6 space-y-4">
                                    <a
                                        href="#"
                                        className="text-white hover:text-[var(--color-primary-light)] font-medium py-2 border-b border-white/20"
                                    >
                                        Home
                                    </a>
                                    <a
                                        href="#destinations"
                                        className="text-white hover:text-[var(--color-primary-light)] font-medium py-2 border-b border-white/20"
                                    >
                                        Destinations
                                    </a>
                                    <a
                                        href="#experiences"
                                        className="text-white hover:text-[var(--color-primary-light)] font-medium py-2 border-b border-white/20"
                                    >
                                        Experiences
                                    </a>
                                    <a
                                        href="#about"
                                        className="text-white hover:text-[var(--color-primary-light)] font-medium py-2 border-b border-white/20"
                                    >
                                        About
                                    </a>
                                    <button
                                        onClick={handleStartPlanning}
                                        className="bg-gradient-to-r from-[var(--color-primary-medium)] to-[var(--color-accent)] text-white font-semibold py-3 px-6 rounded-full mt-4 hover:shadow-lg transition-all duration-300"
                                    >
                                        Plan Your Journey
                                    </button>
                                </nav>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Enhanced Hero Section */}
            <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center transform scale-110"
                    style={{
                        backgroundImage: `url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&crop=center)`,
                    }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60"></div>
                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <div className="mb-6">
                        <span className="inline-block bg-[var(--color-primary-medium)]/20 text-[var(--color-primary-light)] px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border border-[var(--color-primary-light)]/20">
                            Welcome to the Land of Forests
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 drop-shadow-2xl bg-gradient-to-r from-white to-[var(--color-primary-light)] bg-clip-text text-transparent">
                        Johar, Jharkhand!
                    </h1>
                    <p className="text-lg md:text-2xl mb-10 max-w-3xl mx-auto drop-shadow-lg leading-relaxed text-gray-100 h-16 md:h-20">
                        Embark on a journey through{" "}
                        <span className="font-semibold text-[var(--color-primary-light)] border-r-2 border-r-[var(--color-primary-light)] animate-pulse">
                            {text}
                        </span>
                        <br />
                        Let AI craft your perfect Jharkhand adventure.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button
                            onClick={handleStartExploring}
                            className="group bg-gradient-to-r from-[var(--color-primary-medium)] to-[var(--color-accent)] hover:from-[var(--color-accent)] hover:to-[var(--color-primary-medium)] text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-2xl hover:shadow-[var(--color-primary-medium)]/25 flex items-center space-x-2"
                        >
                            <span>Start Exploring</span>
                            <svg
                                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </button>
                        {/* <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:bg-white/20 hover:scale-105">
                            Watch Our Story
                        </button> */}
                    </div>
                </div>
            </section>

            {/* Enhanced Features Section */}
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
                                the essence of Jharkhand, from hidden waterfalls
                                to authentic tribal experiences.
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
                                heritage through carefully curated experiences
                                that respect traditions while creating
                                meaningful connections with local communities.
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
                                Discover and purchase exquisite tribal
                                handicrafts directly from skilled artisans,
                                ensuring your journey contributes to preserving
                                traditional crafts and supporting local
                                livelihoods.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Destinations Section */}
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

            {/* Statistics Section */}
            <section className="py-20 bg-gradient-to-r from-[var(--color-primary-dark)] via-[var(--color-primary-darker)] to-[var(--color-primary-dark)]">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8 text-center text-white">
                        <div className="group">
                            <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform">
                                50+
                            </div>
                            <p className="text-[var(--color-primary-light)]">
                                Destinations
                            </p>
                        </div>
                        <div className="group">
                            <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform">
                                10K+
                            </div>
                            <p className="text-[var(--color-primary-light)]">
                                Happy Travelers
                            </p>
                        </div>
                        <div className="group">
                            <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform">
                                100+
                            </div>
                            <p className="text-[var(--color-primary-light)]">
                                Local Partners
                            </p>
                        </div>
                        <div className="group">
                            <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform">
                                24/7
                            </div>
                            <p className="text-[var(--color-primary-light)]">
                                AI Support
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enhanced CTA Section */}
            <section className="bg-gradient-to-br from-[var(--color-primary-darker)] via-[var(--color-primary-dark)] to-[var(--color-primary-darker)] text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\' viewBox=\'0 0 60 60\'%3e%3cg fill=\'none\' fill-rule=\'evenodd\'%3e%3cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3e%3cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e')] opacity-20"></div>
                <div className="container mx-auto px-6 py-24 text-center relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <span className="inline-block bg-[var(--color-accent)]/30 text-[var(--color-primary-light)] px-4 py-2 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
                            Ready for Adventure?
                        </span>
                        <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                            Your Jharkhand Journey{" "}
                            <span className="block text-[var(--color-primary-light)]">
                                Awaits You
                            </span>
                        </h2>
                        <p className="text-xl lg:text-2xl mb-12 max-w-3xl mx-auto text-white/90 leading-relaxed">
                            Let our intelligent AI guide craft a personalized
                            adventure tailored to your interests, budget, and
                            travel style. Start your unforgettable journey in
                            just minutes.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <button
                                onClick={handleStartPlanning}
                                className="group bg-gradient-to-r from-white to-gray-100 text-[var(--color-primary-dark)] font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-2xl hover:shadow-white/25 flex items-center space-x-3"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                </svg>
                                <span>Start Planning Now</span>
                                <svg
                                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </button>
                            <button className="bg-transparent border-2 border-white/30 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:bg-white/10 hover:border-white/50 backdrop-blur-sm">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 bg-gradient-to-b from-[var(--color-surface)] to-white">
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
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Destinations
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Experiences
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Local Crafts
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Cultural Tours
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4 text-[var(--color-primary-light)]">
                                Support
                            </h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Help Center
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Travel Guide
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Safety Tips
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Contact Us
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
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Community
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Blog
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
        </div>
    );
}
