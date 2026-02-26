import React, { useState } from 'react';
import DaydreamExperience from './components/Daydreamexperience'; // Import the component

const App = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [privacyMode, setPrivacyMode] = useState('high');
  const [audioPermission, setAudioPermission] = useState(false);
  
  // Add these two new state variables for Daydream
  const [showDaydream, setShowDaydream] = useState(false);
  const [selectedTripForDaydream, setSelectedTripForDaydream] = useState(null);

  // Sample trips data
  const trips = [
    {
      id: 1,
      destination: 'Kyoto, Japan',
      dates: 'March 15-22, 2024',
      coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=200&fit=crop',
      memories: 847,
      stories: 12,
      aiGenerated: ['Daily Travel Blog', 'Cinematic Vlog', 'Photo Book']
    },
    {
      id: 2,
      destination: 'Santorini, Greece',
      dates: 'July 3-10, 2024',
      coverImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=200&fit=crop',
      memories: 623,
      stories: 8,
      aiGenerated: ['Travel Blog', 'Sunset Reel', 'Memory Book']
    }
  ];

  // Sample memory highlights
  const memoryHighlights = [
    {
      id: 1,
      type: 'photo',
      thumbnail: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=150&h=150&fit=crop',
      location: 'Fushimi Inari Shrine',
      timestamp: '10:30 AM',
      aiCaption: 'Walking through thousands of vermilion torii gates, each donated by individuals and businesses seeking blessings.'
    },
    {
      id: 2,
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=150&h=150&fit=crop',
      location: 'Arashiyama Bamboo Grove',
      timestamp: '2:15 PM',
      duration: '0:45',
      aiCaption: 'Sunlight filtering through towering bamboo stalks creates a mesmerizing dance of light and shadow.'
    },
    {
      id: 3,
      type: 'audio',
      thumbnail: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=150&h=150&fit=crop',
      location: 'Gion District',
      timestamp: '7:30 PM',
      duration: '2:30',
      aiCaption: 'The distant sound of traditional shamisen music mixed with evening conversations.'
    }
  ];

  // AI-generated content examples
  const aiContent = {
    blogPost: {
      title: 'Day 5: Kyoto\'s Timeless Beauty',
      excerpt: 'The morning mist lifted to reveal golden pagodas standing guard over ancient streets...',
      content: 'Today began with the soft patter of rain on temple roofs, a fitting soundtrack for our visit to Kinkaku-ji. The Golden Pavilion reflected in the mirror pond created a scene so perfect it felt like stepping into a ukiyo-e woodblock print...'
    },
    vlogScript: {
      scenes: [
        { time: '0:00', visual: 'Wide shot of Golden Pavilion at sunrise', audio: 'Ambient birds and temple bells' },
        { time: '0:15', visual: 'Close-up of raked gravel in Zen garden', audio: 'Soft narration about mindfulness' },
        { time: '0:30', visual: 'Time-lapse of clouds moving over pavilion', audio: 'Gentle traditional music' }
      ]
    }
  };

  const generateContent = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  // Function to get selected trip details
  const getSelectedTripDetails = () => {
    if (selectedTrip) {
      return trips.find(t => t.id === selectedTrip);
    }
    return trips[0]; // Default to first trip if none selected
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">🌍</span>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Generative Travelogue
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900 text-xl">
              ⚙️
            </button>
            <button className="bg-purple-600 text-white rounded-full px-4 py-2 text-sm font-medium hover:bg-purple-700 transition flex items-center gap-2">
              <span>✨</span>
              New Trip
            </button>
          </div>
        </div>
      </header>

      {/* Live Recording Bar */}
      {isRecording && (
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="font-semibold">Passively Recording Your Journey</span>
              <span className="text-sm opacity-75 hidden sm:inline">Location • Photos • Ambient Audio</span>
            </div>
            <button 
              onClick={() => setIsRecording(!isRecording)}
              className="bg-white/20 hover:bg-white/30 rounded-full px-4 py-1.5 text-sm font-medium transition"
            >
              {isRecording ? 'Pause' : 'Resume'} Recording
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 relative">
        {/* Privacy Toggle */}
        <div className="absolute top-4 right-4 flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
          <span className="text-sm">🔒</span>
          <select 
            value={privacyMode}
            onChange={(e) => setPrivacyMode(e.target.value)}
            className="text-sm bg-transparent border-none focus:ring-0 outline-none"
          >
            <option value="high">High Privacy</option>
            <option value="medium">Standard Privacy</option>
            <option value="low">Share More</option>
          </select>
        </div>

        {/* Trip Selector */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>✈️</span> Your Journeys
          </h2>
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            {trips.map(trip => (
              <div 
                key={trip.id}
                className={`flex-shrink-0 w-64 bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
                  selectedTrip === trip.id ? 'ring-2 ring-purple-600' : ''
                }`}
                onClick={() => setSelectedTrip(trip.id)}
              >
                <img src={trip.coverImage} alt={trip.destination} className="w-full h-32 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold">{trip.destination}</h3>
                  <p className="text-sm text-gray-600">{trip.dates}</p>
                  <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                    <span>{trip.memories} memories</span>
                    <span>{trip.stories} stories</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Memories (spans 2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Memory Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <span className="text-xl">📷</span>
                  Memory Collection
                </h3>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <span className="text-sm">⏱️</span>
                  <span>Last updated: 2 min ago</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">847</div>
                  <div className="text-xs text-gray-600">Photos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">23</div>
                  <div className="text-xs text-gray-600">Videos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">156</div>
                  <div className="text-xs text-gray-600">Audio Notes</div>
                </div>
              </div>

              {/* Memory Grid */}
              <div className="grid grid-cols-3 gap-2">
                {memoryHighlights.map(memory => (
                  <div key={memory.id} className="relative group cursor-pointer">
                    <img 
                      src={memory.thumbnail} 
                      alt={memory.location}
                      className="w-full h-24 sm:h-32 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition rounded-lg flex items-center justify-center">
                      {memory.type === 'video' && <span className="text-white text-2xl">🎬</span>}
                      {memory.type === 'audio' && <span className="text-white text-2xl">🎤</span>}
                      {memory.type === 'photo' && <span className="text-white text-2xl">📷</span>}
                    </div>
                    <div className="absolute bottom-1 left-1 text-xs text-white bg-black/50 rounded px-1">
                      {memory.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Generation Controls */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <span>✨</span> Generate Content
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button 
                  onClick={generateContent}
                  disabled={isGenerating}
                  className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition text-center"
                >
                  <span className="text-3xl block mb-2">📚</span>
                  <span className="text-sm font-medium">Travel Blog</span>
                </button>
                <button 
                  onClick={generateContent}
                  disabled={isGenerating}
                  className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition text-center"
                >
                  <span className="text-3xl block mb-2">🎥</span>
                  <span className="text-sm font-medium">Vlog Script</span>
                </button>
                <button 
                  onClick={generateContent}
                  disabled={isGenerating}
                  className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition text-center"
                >
                  <span className="text-3xl block mb-2">🖼️</span>
                  <span className="text-sm font-medium">Photo Book</span>
                </button>
              </div>
              
              {isGenerating && (
                <div className="mt-4 p-4 bg-purple-50 rounded-lg flex items-center justify-center gap-3">
                  <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-purple-600">AI is crafting your memories...</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - AI Content */}
          <div className="space-y-6">
            {/* AI Generated Content */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <span className="text-yellow-500">✨</span>
                  AI-Generated Travelogue
                </h3>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full text-lg">⬇️</button>
                  <button className="p-2 hover:bg-gray-100 rounded-full text-lg">↗️</button>
                </div>
              </div>
              
              {/* Blog Post Preview */}
              <div className="mb-4">
                <h4 className="font-medium mb-2 text-sm text-gray-600">Today's Blog Post</h4>
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-lg mb-2">{aiContent.blogPost.title}</h5>
                  <p className="text-gray-700 text-sm mb-3">{aiContent.blogPost.excerpt}</p>
                  <button className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center">
                    Read full story <span className="ml-1">→</span>
                  </button>
                </div>
              </div>

              {/* Vlog Script Preview */}
              <div>
                <h4 className="font-medium mb-2 text-sm text-gray-600">Vlog Script with B-Roll</h4>
                <div className="space-y-2">
                  {aiContent.vlogScript.scenes.map((scene, index) => (
                    <div key={index} className="flex items-start space-x-3 text-sm p-2 hover:bg-gray-50 rounded">
                      <span className="font-mono text-gray-500 text-xs">{scene.time}</span>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{scene.visual}</p>
                        <p className="text-gray-600 text-xs">{scene.audio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Daydream Mode - FIXED BUTTON */}
            <div className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white rounded-xl shadow-lg p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <div className="relative z-10">
                <h3 className="font-semibold flex items-center gap-2 mb-3">
                  <span className="text-pink-400">❤️</span>
                  Daydream Mode
                </h3>
                <p className="text-white/80 text-sm mb-4">
                  Relive your {getSelectedTripDetails().destination} journey with an AI-generated narrative soundtrack
                </p>
                <button 
                  onClick={() => {
                    setSelectedTripForDaydream(getSelectedTripDetails());
                    setShowDaydream(true);
                  }}
                  className="bg-white text-indigo-900 rounded-full px-6 py-3 font-medium flex items-center space-x-2 hover:bg-white/90 transition w-full justify-center"
                >
                  <span>▶️</span>
                  <span>Begin Your Daydream</span>
                </button>
                <div className="mt-4 flex items-center justify-between text-xs text-white/60">
                  <span>Duration: 30 sec</span>
                  <span>Created: Just now</span>
                </div>
              </div>
            </div>

            {/* Privacy Controls */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold flex items-center gap-2 mb-4">
                <span>🔒</span>
                Privacy Controls
              </h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between text-sm">
                  <span>Location Tracking</span>
                  <input type="checkbox" className="rounded text-purple-600" defaultChecked />
                </label>
                <label className="flex items-center justify-between text-sm">
                  <span>Photo Analysis</span>
                  <input type="checkbox" className="rounded text-purple-600" defaultChecked />
                </label>
                <label className="flex items-center justify-between text-sm">
                  <span>Audio Recording</span>
                  <input 
                    type="checkbox" 
                    className="rounded text-purple-600"
                    checked={audioPermission}
                    onChange={(e) => setAudioPermission(e.target.checked)}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                All processing happens on-device. Your memories stay private.
              </p>
            </div>

            {/* Share Options */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold mb-4">Share Your Story</h3>
              <div className="flex justify-around">
                <button className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:shadow-lg transition flex items-center justify-center text-2xl">
                  📸
                </button>
                <button className="w-12 h-12 bg-red-600 text-white rounded-full hover:shadow-lg transition flex items-center justify-center text-2xl">
                  🎬
                </button>
                <button className="w-12 h-12 bg-blue-400 text-white rounded-full hover:shadow-lg transition flex items-center justify-center text-2xl">
                  🐦
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-6">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-600">
          <p>Your memories, beautifully preserved with AI. Never lose a travel moment again.</p>
        </div>
      </footer>

      {showDaydream && (
  <DaydreamExperience 
    trip={selectedTripForDaydream}
    onClose={() => setShowDaydream(false)}
    audioSrc="my-soundtrack.mp3"
  />
)}
    </div>
  );
};

export default App;