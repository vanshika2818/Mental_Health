



import React, { useState } from "react";
import axios from "axios";

// Mood background + text styles
const moodStyles = {
  joy: "bg-yellow-100 text-yellow-800",
  sadness: "bg-blue-100 text-blue-800",
  anger: "bg-red-100 text-red-800",
  neutral: "bg-gray-100 text-gray-800",
  surprise: "bg-purple-100 text-purple-800",
  disgust: "bg-green-100 text-green-800",
  fear: "bg-indigo-100 text-indigo-800",
};

// Quotes for each mood
const moodQuotes = {
  joy: "Keep shining, the world needs your light!",
  sadness: "It's okay to feel sad. Better days are coming.",
  anger: "Take a deep breath, you're stronger than you think.",
  neutral: "Balance is beautiful. Stay grounded.",
  surprise: "Life’s surprises often lead to the best stories!",
  disgust: "Let go of what doesn’t serve you.",
  fear: "Courage isn’t the absence of fear, but the triumph over it.",
};

function App() {
  const [userInput, setUserInput] = useState("");
  const [emotion, setEmotion] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheckEmotion = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/emotion`, {
        text: userInput,
      });
      setEmotion(response.data.emotion || null);
    } catch (error) {
      console.error("Error fetching emotion:", error.message);
      setEmotion(null);
    } finally {
      setLoading(false);
    }
  };

  const emotionLabel = emotion?.label?.toLowerCase();
  const styleClass = moodStyles[emotionLabel] || "bg-white text-black";
  const quote = moodQuotes[emotionLabel];

  return (
    <div className={`min-h-screen flex flex-col items-center justify-start p-6 transition-all duration-300 ${styleClass}`}>
      {/* Header */}
      <div className="text-center mt-10">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center gap-2">
          <span role="img" aria-label="brain">🧠</span> Mental Health Check-in
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Share your thoughts and discover your emotional state
        </p>
      </div>

      {/* Prompt */}
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8 mt-10">
        <p className="text-center text-gray-800 text-xl font-semibold mb-2">
          How are you feeling today?
        </p>
        <p className="text-center text-gray-500 mb-6">
          Take a moment to reflect and share your thoughts with us.
        </p>

        {/* Textarea */}
        <textarea
          placeholder="Write what’s on your mind..."
          rows="5"
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={handleCheckEmotion}
          className="mt-6 w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Checking..." : "Check Emotion"}
        </button>

        {/* Output */}
        {emotion && (
          <div className="mt-8 text-center">
            <p className="text-xl font-semibold">
              <strong>Detected Emotion:</strong> {emotion.label}
            </p>
            <p className="text-md text-gray-700 mt-2">
              <strong>Confidence Score:</strong> {emotion.score?.toFixed(2)}
            </p>

            {quote && (
              <p className="mt-6 text-lg italic text-gray-800 max-w-xl mx-auto">
                “{quote}”
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
