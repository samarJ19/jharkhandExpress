import { useEffect, useState } from "react";

// Placeholder icons
const CompassIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-amber-800"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6a2 2 0 100-4 2 2 0 000 4zm0 12a2 2 0 100-4 2 2 0 000 4zm0 0v1m0-1v.01"
        />
    </svg>
);

const CultureIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-amber-800"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M9 12l6 6m-6 0l6-6"
        />
    </svg>
);

const MarketIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-amber-800"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
    </svg>
);

const ChevronLeft = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
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
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
);

export default function Home() {
    // Sample destination data with placeholder images
    const destinations = [
        {
            name: "Patratu Valley",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=600&fit=crop&crop=center",
            description: "A stunning valley with pristine beauty",
        },
        {
            name: "Netarhat",
            image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=500&h=600&fit=crop&crop=center",
            description: "The Queen of Chotanagpur",
        },
        {
            name: "Dassam Falls",
            image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=600&fit=crop&crop=center",
            description: "Magnificent cascading waterfall",
        },
        {
            name: "Jagannath Temple",
            image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500&h=600&fit=crop&crop=center",
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
            name: "Hundru Falls",
            image: "/hundru.jpg",
            description: "One of Ranchi’s most famous waterfalls",
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
    ];


    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide
            ? destinations.length - 1
            : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === destinations.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 4000);
        return () => clearInterval(slideInterval);
    }, [currentIndex]);

    return (
        <div className="bg-stone-50 font-sans">
            {/* Header */}
            <header className="absolute top-0 left-0 w-full z-30 p-4 bg-transparent text-white">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold tracking-wider">
                        Jharkhand Express
                    </h1>
                    <nav className="hidden md:flex items-center space-x-6">
                        <a
                            href="#"
                            className="hover:text-amber-200 transition-colors duration-300"
                        >
                            Home
                        </a>
                        <a
                            href="#"
                            className="hover:text-amber-200 transition-colors duration-300"
                        >
                            Jharkhand Treasures
                        </a>
                        <a
                            href="#"
                            className="hover:text-amber-200 transition-colors duration-300"
                        >
                            About
                        </a>
                        <a
                            href="#"
                            className="hover:text-amber-200 transition-colors duration-300"
                        >
                            Contact
                        </a>
                    </nav>
                    <button className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-6 rounded-full transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-lg">
                        Plan Your Trip
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center text-white">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&crop=center)`,
                    }}
                ></div>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-2xl">
                        Johar, Jharkhand!
                    </h1>
                    <p className="text-lg md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-lg">
                        Discover ancient tribes, cascading waterfalls, and dense
                        forests. Your unforgettable journey begins here.
                    </p>
                    <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-xl">
                        Start Exploring
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-stone-50">
                <div className="container mx-auto text-center px-4">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Why Travel With Us?
                    </h2>
                    <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
                        We blend technology with tradition to offer you an
                        unparalleled travel experience in the heart of India.
                    </p>
                    <div className="grid md:grid-cols-3 gap-12">
                        {/* Feature Card 1 */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                            <div className="mb-4 flex justify-center">
                                <CompassIcon />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                AI-Powered Itinerary
                            </h3>
                            <p className="text-gray-600">
                                Craft your perfect journey in minutes with our
                                intelligent, personalized trip planner. Just
                                tell us what you love!
                            </p>
                        </div>
                        {/* Feature Card 2 */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                            <div className="mb-4 flex justify-center">
                                <CultureIcon />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                Authentic Experiences
                            </h3>
                            <p className="text-gray-600">
                                Connect deeply with local culture, uncover
                                hidden gems, and experience the true essence of
                                Jharkhand.
                            </p>
                        </div>
                        {/* Feature Card 3 */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                            <div className="mb-4 flex justify-center">
                                <MarketIcon />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                Support Local Artisans
                            </h3>
                            <p className="text-gray-600">
                                Explore and buy unique tribal handicrafts
                                directly from the source in our integrated
                                marketplace.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Destinations Section - Enhanced and Fixed */}
            <section className="py-20 bg-stone-100 overflow-hidden">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
                        Featured Destinations
                    </h2>
                    <div className="relative flex items-center justify-center h-[600px] max-w-7xl mx-auto">
                        {/* Carousel Container */}
                        <div className="relative w-full h-full flex items-center justify-center">
                            {destinations.map((destination, index) => {
                                const totalItems = destinations.length;
                                let offset = index - currentIndex;

                                // Handle wrapping for smooth circular motion
                                if (offset > totalItems / 2)
                                    offset -= totalItems;
                                if (offset < -totalItems / 2)
                                    offset += totalItems;

                                // Calculate positioning and styling based on offset
                                let transform = "";
                                let opacity = 0;
                                let zIndex = 0;
                                let scale = 0.6;
                                let blur = 8;

                                if (Math.abs(offset) <= 2) {
                                    opacity = 1;

                                    if (offset === 0) {
                                        // Center image
                                        scale = 1;
                                        zIndex = 30;
                                        blur = 0;
                                        transform = `translateX(0%) scale(${scale})`;
                                    } else if (Math.abs(offset) === 1) {
                                        // Adjacent images
                                        scale = 0.8;
                                        zIndex = 20;
                                        blur = 2;
                                        const xPos = offset * 70; // Adjust spacing
                                        transform = `translateX(${xPos}%) scale(${scale})`;
                                        opacity = 0.8;
                                    } else if (Math.abs(offset) === 2) {
                                        // Far images
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
                                                className="w-full h-full object-cover rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl"></div>
                                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                                <h3 className="text-white text-2xl md:text-3xl font-bold drop-shadow-lg">
                                                    {destination.name}
                                                </h3>
                                                <p className="text-white/80 text-sm mt-2">
                                                    {destination.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Navigation Buttons */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 bg-white/90 hover:bg-white rounded-full p-3 text-gray-800 transition-all shadow-xl hover:scale-110"
                            aria-label="Previous image"
                        >
                            <ChevronLeft />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 bg-white/90 hover:bg-white rounded-full p-3 text-gray-800 transition-all shadow-xl hover:scale-110"
                            aria-label="Next image"
                        >
                            <ChevronRight />
                        </button>

                        {/* Dots Indicator */}
                        {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex space-x-2">
                            {destinations.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-3 h-3 rounded-full transition-all ${
                                        index === currentIndex
                                            ? "bg-amber-500 scale-125"
                                            : "bg-white/50 hover:bg-white/80"
                                    }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div> */}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-amber-800 text-white">
                <div className="container mx-auto px-4 py-20 text-center">
                    <h2 className="text-4xl font-bold mb-4">
                        Ready for an Adventure?
                    </h2>
                    <p className="text-xl mb-8 max-w-3xl mx-auto text-amber-100">
                        Let our AI guide help you plan a personalized trip to
                        Jharkhand. It's fast, easy, and tailored just for you.
                    </p>
                    <button className="bg-white text-amber-800 font-bold py-3 px-8 rounded-full text-lg transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-lg">
                        Start Planning Now
                    </button>
                </div>
            </section>
        </div>
    );
}
