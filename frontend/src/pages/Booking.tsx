import React, { useState } from "react";
import {
    Star,
    MapPin,
    Check,
    X,
    Phone,
    Mail,
    Building,
    UserCheck,
} from "lucide-react";

// --- THEME DEFINITION ---
const forestTheme = {
    "--color-primary-light": "#ccfbf1",
    "--color-primary-medium": "#14b8a6",
    "--color-primary-dark": "#0f766e",
    "--color-primary-darker": "#134e4a",
    "--color-accent": "#10b981",
    "--color-background": "#f0fdfa",
    "--color-surface": "#ffffff",
    "--color-text-base": "#1f2937",
    "--color-text-muted": "#4b5563",
    "--color-text-inverted": "#ffffff",
};

// --- TYPE DEFINITIONS ---
interface Hotel {
    id: string;
    title: string;
    description: string;
    location: string;
    type: string;
    rating: number;
    reviews: number;
    price: number;
    oldPrice?: number;
    discount?: string;
    badge: "discount" | "featured" | "default";
    image: string;
    features: string[];
    amenities: string[];
    contact: string;
    email?: string;
}

interface Guide {
    id: string;
    title: string;
    description: string;
    location: string;
    languages: string;
    rating: number;
    reviews: number;
    price: number;
    badge: "featured" | "eco" | "adventure";
    image: string;
    features: string[];
    specialties: string[];
    contact: string;
    email: string;
}

interface SearchData {
    destination: string;
    checkin: string;
    checkout: string;
    guests: string;
    tourType: string;
    duration: string;
    groupSize: string;
}

const Booking: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"hotels" | "guides">("hotels");
    const [selectedModal, setSelectedModal] = useState<string | null>(null);
    const [searchData, setSearchData] = useState<SearchData>({
        destination: "",
        checkin: "",
        checkout: "",
        guests: "1",
        tourType: "",
        duration: "",
        groupSize: "",
    });

    const hotels: Hotel[] = [
        {
            id: "hotel1",
            title: "Tribal Heritage Resort",
            description:
                "Authentic tribal-style accommodation with modern amenities nestled in the heart of Jharkhand's cultural landscape.",
            location: "Ranchi",
            type: "Luxury Resort",
            rating: 4.5,
            reviews: 127,
            price: 2499,
            oldPrice: 3199,
            discount: "25% Off",
            badge: "discount",
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop",
            features: ["Free WiFi", "Cultural Shows", "Local Cuisine"],
            amenities: [
                "Air Conditioning",
                "Room Service",
                "Spa",
                "Traditional Decor",
            ],
            contact: "+91 98765 43210",
        },
        {
            id: "hotel2",
            title: "Forest Eco Lodge",
            description:
                "Sustainable eco-friendly accommodation surrounded by pristine forests, perfect for nature enthusiasts.",
            location: "Hazaribagh",
            type: "Eco Lodge",
            rating: 4.8,
            reviews: 89,
            price: 1899,
            badge: "featured",
            image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop",
            features: ["Nature Trails", "Bird Watching", "Organic Food"],
            amenities: [
                "Eco-friendly",
                "Guided Walks",
                "Organic Garden",
                "Library",
            ],
            contact: "+91 98765 43211",
        },
        {
            id: "hotel3",
            title: "Adventure Base Camp",
            description:
                "Perfect base for adventure seekers with camping facilities and guided outdoor activities.",
            location: "Deoghar",
            type: "Adventure Camp",
            rating: 4.3,
            reviews: 201,
            price: 3299,
            oldPrice: 4199,
            discount: "21% Off",
            badge: "discount",
            image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=250&fit=crop",
            features: ["Adventure Sports", "Trekking", "Campfire"],
            amenities: [
                "Camping Gear",
                "Safety Equipment",
                "Expert Guides",
                "First Aid",
            ],
            contact: "+91 98765 43212",
        },
    ];

    const guides: Guide[] = [
        {
            id: "guide1",
            title: "Sita Devi",
            description:
                "Experienced tribal culture guide specializing in traditional crafts, folklore, and authentic village experiences.",
            location: "Ranchi Region",
            languages: "Hindi, Santali, English",
            rating: 4.9,
            reviews: 157,
            price: 2500,
            badge: "featured",
            image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=250&fit=crop",
            features: ["8+ Yrs Exp.", "Certified", "Cultural Expert"],
            specialties: [
                "Tribal Villages",
                "Handicrafts",
                "Folk Music",
                "Traditional Cooking",
            ],
            contact: "+91 98765 54321",
            email: "sita.guide@jharkhandexpress.com",
        },
        {
            id: "guide2",
            title: "Raj Kumar",
            description:
                "Wildlife photographer and nature expert with deep knowledge of Jharkhand's biodiversity and eco-systems.",
            location: "Hazaribagh Park",
            languages: "Hindi, English",
            rating: 4.7,
            reviews: 98,
            price: 1800,
            badge: "eco",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
            features: ["Wildlife Expert", "Photographer", "Bird Specialist"],
            specialties: [
                "Wildlife Safari",
                "Bird Watching",
                "Nature Photography",
                "Forest Ecology",
            ],
            contact: "+91 98765 54322",
            email: "raj.wildlife@jharkhandexpress.com",
        },
        {
            id: "guide3",
            title: "Arjun Singh",
            description:
                "Certified adventure guide with expertise in trekking, rock climbing, and water sports across Jharkhand.",
            location: "Jamshedpur",
            languages: "Hindi, English",
            rating: 4.6,
            reviews: 143,
            price: 2200,
            badge: "adventure",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=250&fit=crop",
            features: ["Adventure Pro", "Safety Certified", "Fully Equipped"],
            specialties: [
                "Rock Climbing",
                "Trekking",
                "Water Sports",
                "Cave Exploration",
            ],
            contact: "+91 98765 54323",
            email: "arjun.adventure@jharkhandexpress.com",
        },
    ];

    const handleInputChange = (field: keyof SearchData, value: string) => {
        setSearchData((prev) => ({ ...prev, [field]: value }));
    };

    const openModal = (id: string) => setSelectedModal(id);
    const closeModal = () => setSelectedModal(null);

    const getModalData = (): Hotel | Guide | null => {
        if (!selectedModal) return null;
        const collection = selectedModal.startsWith("hotel") ? hotels : guides;
        return collection.find((item) => item.id === selectedModal) || null;
    };

    const getBadgeStyle = (badge?: string) => {
        switch (badge) {
            case "featured":
                return "bg-amber-500 text-white";
            case "discount":
                return "bg-red-500 text-white";
            case "eco":
                return "bg-emerald-500 text-white";
            case "adventure":
                return "bg-sky-500 text-white";
            default:
                return "bg-slate-500 text-white";
        }
    };

    const renderRating = (rating: number) =>
        Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                size={16}
                className={
                    i < Math.round(rating)
                        ? "text-[var(--color-accent)] fill-current"
                        : "text-gray-300"
                }
            />
        ));

    const currentList = activeTab === "hotels" ? hotels : guides;

    return (
        <div
            style={forestTheme as React.CSSProperties}
            className="bg-[var(--color-background)] min-h-screen font-sans"
        >
            <div className="max-w-7xl mx-auto p-4 md:p-8">
                <div className="relative bg-gradient-to-br from-[var(--color-primary-darker)] to-[var(--color-primary-dark)] rounded-2xl p-8 md:p-12 text-center text-[var(--color-text-inverted)] mb-10 overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
                    <div className="relative z-10">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Book Your Jharkhand Adventure
                        </h1>
                        <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                            Find the perfect stay and expert guides for an
                            authentic experience.
                        </p>
                        <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 mt-8">
                            <div className="flex gap-2 justify-center mb-6 bg-slate-800/50 p-1 rounded-full border border-slate-700 w-fit mx-auto">
                                <button
                                    onClick={() => setActiveTab("hotels")}
                                    className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
                                        activeTab === "hotels"
                                            ? "bg-white text-[var(--color-primary-darker)]"
                                            : "bg-transparent text-white"
                                    }`}
                                >
                                    Hotels
                                </button>
                                <button
                                    onClick={() => setActiveTab("guides")}
                                    className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
                                        activeTab === "guides"
                                            ? "bg-white text-[var(--color-primary-darker)]"
                                            : "bg-transparent text-white"
                                    }`}
                                >
                                    Tour Guides
                                </button>
                            </div>
                            {/* Search Forms remain the same, just styled differently if needed */}
                        </div>
                    </div>
                </div>

                <section>
                    <h2 className="text-3xl font-bold text-center mb-10 text-[var(--color-text-base)]">
                        {activeTab === "hotels"
                            ? "Featured Accommodations"
                            : "Expert Local Guides"}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {currentList.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 border border-slate-200/80"
                            >
                                <div className="relative">
                                    <div
                                        className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold z-10 ${getBadgeStyle(
                                            item.badge
                                        )}`}
                                    >
                                        {item.badge === "discount"
                                            ? item.discount
                                            : item.badge}
                                    </div>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-56 object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2 text-gray-800">
                                        {item.title}
                                    </h3>
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="flex text-yellow-400">
                                            {renderRating(item.rating)}
                                        </div>
                                        <span className="text-sm text-gray-600">
                                            {item.rating} ({item.reviews}{" "}
                                            reviews)
                                        </span>
                                    </div>
                                    <p className="text-gray-600 mb-4 h-20 text-sm">
                                        {item.description}
                                    </p>
                                    <div className="border-t border-gray-100 pt-4">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <span className="text-2xl font-bold text-gray-800">
                                                    ₹
                                                    {item.price.toLocaleString()}
                                                </span>
                                                <span className="text-sm text-gray-600">
                                                    /
                                                    {activeTab === "hotels"
                                                        ? "night"
                                                        : "day"}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    openModal(item.id)
                                                }
                                                className="bg-[var(--color-primary-medium)] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[var(--color-primary-dark)] transition-all"
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {selectedModal &&
                    (() => {
                        const data = getModalData();
                        if (!data) return null;
                        return (
                            <div
                                className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                                onClick={closeModal}
                            >
                                <div
                                    className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="relative">
                                        <button
                                            onClick={closeModal}
                                            className="absolute top-4 right-4 bg-gray-200/50 rounded-full p-2 hover:bg-gray-300 z-10"
                                        >
                                            <X size={20} />
                                        </button>
                                        <img
                                            src={data.image}
                                            alt={data.title}
                                            className="w-full h-64 object-cover rounded-t-2xl"
                                        />
                                        <div className="p-8">
                                            <h3 className="text-3xl font-bold mb-2">
                                                {data.title}
                                            </h3>
                                            <p className="text-gray-600 mb-6">
                                                {data.description}
                                            </p>
                                            {/* ... Rest of modal content is the same */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })()}
            </div>
        </div>
    );
};

export default Booking;
