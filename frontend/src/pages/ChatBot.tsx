import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
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
  MessageCircle,
} from "lucide-react";
import DirectionsMap from "./DirectionBetweenMultiple";
import FeatureComponent from "../Component/FeatureComponent"; // Import the new component
import { MapLoadingShimmer } from "../Component/MapLoadingState";

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [poiData, setPoiData] = useState(null); // Added state for POI data
  const [mapLoading, setMapLoading] = useState(false); // Added state for map loading
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content: "",
      timestamp: new Date(),
    },
  ]);

  // Streaming itinerary from backend
  const handleSubmit = async (e?: React.FormEvent | React.MouseEvent | React.KeyboardEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    // Add user message to chat
    const userMessage = {
      id: messages.length + 1,
      type: "user" as const,
      content: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setError("");
    setPoiData(null); // Reset POI data for new request
    setMapLoading(false); // Reset map loading state

    // Store input value before clearing it
    const currentInput = input;
    setInput(""); // Clear input immediately after storing

    try {
      const response = await fetch("http://localhost:5000/stream-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_prompt: currentInput }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error("No response body available");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let botContent = "";

      // Add a placeholder bot message for streaming
      const botMessageId = Date.now(); // Use timestamp for unique ID
      setMessages((prev) => [
        ...prev,
        {
          id: botMessageId,
          type: "bot" as const,
          content: "",
          timestamp: new Date(),
        },
      ]);

      // Stream the content
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value);
          botContent += chunk;
          // Update the last bot message with streamed content
          setMessages((prev) => {
            const updated = [...prev];
            const lastIdx = updated.length - 1;
            if (
              updated[lastIdx].type === "bot" &&
              updated[lastIdx].id === botMessageId
            ) {
              updated[lastIdx] = {
                ...updated[lastIdx],
                content: botContent,
              };
            }
            return updated;
          });
        }
      }

      if (botContent.trim()) {
        try {
          setMapLoading(true); // Start map loading
          const poiResponse = await fetch(
            "https://promptyatra-1052532391820.europe-west1.run.app/extract-poi-geocodes",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true", // Common header for ngrok
              },
              body: JSON.stringify({ itinerary: botContent }),
            }
          );

          if (!poiResponse.ok) {
            throw new Error(`POI extraction failed: ${poiResponse.status}`);
          }

          const poiResponseData = await poiResponse.json();

          // Simulate a slight delay to show the loading screen
          setTimeout(() => {
            setPoiData(poiResponseData);
            setMapLoading(false); // End map loading
          }, 1500); // 1.5 second delay to ensure smooth loading transition
        } catch (poiError) {
          console.error("Error extracting POI data:", poiError);
          setMapLoading(false); // End map loading on error
        }
      }
    } catch (err: any) {
      console.error("Error:", err);
      setError(err.message);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: "bot" as const,
          content: `Sorry, I couldn't process that request. Mind trying again?`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Handle feature clicks
  const handleFeatureClick = (feature: string) => {
    setInput(feature);
    // Optionally auto-submit when a feature is clicked
    // handleSubmit();
  };

  // Check if we should show the right panel (either features or map)
  const showRightPanel = true; // Always show right panel now

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

      {/* Main Content Area - Split between chat and right panel */}
      <div
        className={`flex-1 flex ${
          showRightPanel ? "divide-x divide-gray-200" : ""
        }`}
      >
        {/* Chat Area */}
        <div className={`flex flex-col ${showRightPanel ? "w-1/2" : "flex-1"}`}>
          {/* Top Header */}
          <div className="border-b border-gray-200 bg-white px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-semibold text-gray-900">
                  Prompt Yatra
                </h1>
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
              {/* Welcome Screen - Show only when there's just the initial bot message */}
              {messages.length === 1 &&
                messages[0].type === "bot" &&
                messages[0].content === "" && (
                  <div className="flex flex-col items-center justify-center h-full min-h-[400px] space-y-6">
                    {/* Travel Illustration */}
                    <div className="relative">
                      <img
                        src="jharkhandIntro.jpeg"
                        alt="Travel Illustration"
                        className="w-64 h-64 object-contain rounded-full"
                      />
                    </div>

                    {/* Welcome Text */}
                    <div className="text-center space-y-4">
                      <h1 className="text-4xl font-bold text-gray-900">
                        Where to today?
                      </h1>
                      <p className="text-lg text-gray-600 max-w-md">
                        Hey there, I'm here to assist you in planning your
                        experience. Ask me anything travel related.
                      </p>
                    </div>
                  </div>
                )}

              {/* Regular chat messages - Show when there are multiple messages or conversation has started */}
              {!(
                messages.length === 1 &&
                messages[0].type === "bot" &&
                messages[0].content === ""
              ) &&
                messages.map((message) => (
                  <div key={message.id}>
                    {message.type === "bot" ? (
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <MessageCircle className="w-4 h-4 text-gray-600" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                            {/* Enhanced Markdown rendering */}
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              rehypePlugins={[rehypeHighlight]}
                              components={{
                                h1: ({ node, ...props }) => (
                                  <h1
                                    className="text-2xl font-bold mt-4 mb-2"
                                    {...props}
                                  />
                                ),
                                h2: ({ node, ...props }) => (
                                  <h2
                                    className="text-xl font-semibold mt-4 mb-2"
                                    {...props}
                                  />
                                ),
                                h3: ({ node, ...props }) => (
                                  <h3
                                    className="text-lg font-semibold mt-3 mb-1"
                                    {...props}
                                  />
                                ),
                                p: ({ node, ...props }) => (
                                  <p className="mb-2" {...props} />
                                ),
                                ul: ({ node, ...props }) => (
                                  <ul
                                    className="list-disc ml-6 mb-2"
                                    {...props}
                                  />
                                ),
                                ol: ({ node, ...props }) => (
                                  <ol
                                    className="list-decimal ml-6 mb-2"
                                    {...props}
                                  />
                                ),
                                li: ({ node, ...props }) => (
                                  <li className="mb-1" {...props} />
                                ),
                                table: ({ node, ...props }) => (
                                  <table
                                    className="min-w-full border border-gray-200 my-2"
                                    {...props}
                                  />
                                ),
                                th: ({ node, ...props }) => (
                                  <th
                                    className="border px-2 py-1 bg-gray-100"
                                    {...props}
                                  />
                                ),
                                td: ({ node, ...props }) => (
                                  <td className="border px-2 py-1" {...props} />
                                ),
                                code: ({
                                  node,
                                  inline,
                                  className,
                                  children,
                                  ...props
                                }: any) =>
                                  inline ? (
                                    <code
                                      className="bg-gray-100 rounded px-1 py-0.5 font-mono text-sm"
                                      {...props}
                                    >
                                      {children}
                                    </code>
                                  ) : (
                                    <pre className="bg-gray-900 text-white rounded p-3 overflow-x-auto my-2">
                                      <code className={className} {...props}>
                                        {children}
                                      </code>
                                    </pre>
                                  ),
                              }}
                            >
                              {message.content}
                            </ReactMarkdown>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">
                              {message.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
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
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

              {/* Loading indicator */}
              {!(
                messages.length === 1 &&
                messages[0].type === "bot" &&
                messages[0].content === ""
              ) &&
                loading && (
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{
                              animationDelay: "0.1s",
                            }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{
                              animationDelay: "0.2s",
                            }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500">
                          Thinking...
                        </span>
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
                      if (e.key === "Enter" && !e.shiftKey) {
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

        {/* Right Panel - Conditionally shows FeatureComponent, MapLoadingShimmer, or DirectionsMap */}
        {showRightPanel && (
          <div className="w-1/2 bg-white">
            {mapLoading ? (
              // Show loading shimmer when map is loading
              <MapLoadingShimmer />
            ) : poiData ? (
              // Show map when POI data is available and not loading
              <div className="h-full">
                <DirectionsMap locationData={poiData} />
              </div>
            ) : (
              // Show features when no POI data
              <FeatureComponent onFeatureClick={handleFeatureClick} />
            )}
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="fixed bottom-4 right-4 max-w-sm z-50">
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}
