"use client";

import React, { useState } from "react";
import { 
    Search, 
    Heart, 
    FileText, 
    Bell, 
    Share2, 
    ThumbsUp, 
    ThumbsDown,
    Plus,
    Mic,
    Send,
    MoreHorizontal,
    Star,
    MessageCircle
} from "lucide-react";

export default function Chatbot() {
    const [input, setInput] = useState("");
    const [itinerary, setItinerary] = useState(""); // only store itinerary
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: "bot",
            content: "Hey there! I can help you plan your trip. Just tell me where you'd like to go and what you're interested in.",
            timestamp: new Date()
        }
    ]);

    const handleSubmit = async (e?: React.MouseEvent | React.KeyboardEvent) => {
        e?.preventDefault();
        if (!input.trim()) return;

        // Add user message to chat
        const userMessage = {
            id: messages.length + 1,
            type: "user",
            content: input,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]);

        setLoading(true);
        setError("");

        try {
            const res = await fetch("https://your-teammates-api.com/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: input }), // sending user input
            });

            if (!res.ok) throw new Error("API request failed");

            const data = await res.json();
            // expected: { itinerary: "Trip plan here...", places: ["Delhi","Goa"] }

            const itineraryText = data.itinerary || "No itinerary received.";
            setItinerary(itineraryText);

            // Add bot response to chat
            const botMessage = {
                id: messages.length + 2,
                type: "bot",
                content: itineraryText,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMessage]);

        } catch (err : any) {
            setError(err.message);
            const errorMessage = {
                id: messages.length + 2,
                type: "bot",
                content: `Sorry, I couldn't process that request. Mind trying again?`,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
            setInput("");
        }
    };

    return (
        <div className="h-screen bg-gray-50 flex">
            {/* Left Sidebar */}
            <div className="w-16 border-r border-gray-200 bg-white flex flex-col items-center py-4 space-y-4">
                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                </div>
                
                <div className="w-8 h-px bg-gray-200"></div>
                
                <div className="flex flex-col space-y-3">
                    <button className="w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors">
                        <Search className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors">
                        <Heart className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors">
                        <FileText className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors">
                        <Bell className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
                {/* Top Header */}
                <div className="border-b border-gray-200 bg-white px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-xl font-semibold text-gray-900">Trip Planner Chat</h1>
                            <div className="flex items-center space-x-2">
                                <span className="px-3 py-1 bg-black text-white text-sm rounded-full cursor-pointer">
                                    Chat
                                </span>
                                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full cursor-pointer hover:bg-gray-200">
                                    Search
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <Share2 className="w-5 h-5 text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <MoreHorizontal className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-4xl mx-auto space-y-6">
                        {messages.map((message) => (
                            <div key={message.id}>
                                {message.type === 'bot' ? (
                                    <div className="flex items-start space-x-4">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                            <MessageCircle className="w-4 h-4 text-gray-600" />
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                                                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                                                    {message.content}
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-gray-400">
                                                    {message.timestamp.toLocaleTimeString([], { 
                                                        hour: '2-digit', 
                                                        minute: '2-digit' 
                                                    })}
                                                </span>
                                                <div className="flex items-center space-x-1">
                                                    <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                                                        <Share2 className="w-4 h-4 text-gray-400" />
                                                    </button>
                                                    <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                                                        <ThumbsUp className="w-4 h-4 text-gray-400" />
                                                    </button>
                                                    <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                                                        <ThumbsDown className="w-4 h-4 text-gray-400" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex justify-end">
                                        <div className="max-w-lg">
                                            <div className="bg-gray-900 text-white rounded-lg p-4">
                                                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                                    {message.content}
                                                </p>
                                                <p className="text-xs text-gray-300 mt-2">
                                                    {message.timestamp.toLocaleTimeString([], { 
                                                        hour: '2-digit', 
                                                        minute: '2-digit' 
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Loading indicator */}
                        {loading && (
                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                    <MessageCircle className="w-4 h-4 text-gray-600" />
                                </div>
                                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                                    <div className="flex items-center space-x-2">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                        </div>
                                        <span className="text-sm text-gray-500">Thinking...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Input Area */}
                <div className="border-t border-gray-200 bg-white p-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center space-x-3">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <Plus className="w-5 h-5 text-gray-600" />
                            </button>
                            <div className="flex-1 relative">
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSubmit(e);
                                        }
                                    }}
                                    placeholder="Ask anything..."
                                    className="w-full px-4 py-3 pr-20 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 placeholder-gray-500"
                                    disabled={loading}
                                />
                                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                        <Mic className="w-4 h-4 text-gray-500" />
                                    </button>
                                    <button 
                                        onClick={handleSubmit}
                                        disabled={loading || !input.trim()}
                                        className="p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <Send className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Error Display */}
            {error && (
                <div className="fixed bottom-4 right-4 max-w-sm">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-red-800 text-sm">{error}</p>
                    </div>
                </div>
            )}
        </div>
    );
}