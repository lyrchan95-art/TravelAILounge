import React, { useState } from 'react';
import DaydreamExperience from './components/Daydreamexperience'; // Import the component

const App = () => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showDaydream, setShowDaydream] = useState(false);
  const [selectedTripForDaydream, setSelectedTripForDaydream] = useState(null);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [showMemoryModal, setShowMemoryModal] = useState(false);
  const [daydreamMood, setDaydreamMood] = useState('nostalgic');

  // High-quality images
  const trips = [
    {
      id: 1,
      destination: 'Kyoto, Japan',
      dates: 'March 15-22, 2024',
      coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop',
      memories: 847,
      stories: 12,
      daydreamPreview: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=600&fit=crop'
    },
    {
      id: 2,
      destination: 'Santorini, Greece',
      dates: 'July 3-10, 2024',
      coverImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop',
      memories: 623,
      stories: 8,
      daydreamPreview: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=600&fit=crop'
    }
  ];

  const memoryHighlights = [
    {
      id: 1,
      type: 'photo',
      thumbnail: 'https://images.unsplash.com/photo-1493787039806-2edcbe808750?w=400&h=400&fit=crop',
      location: 'Fushimi Inari Shrine',
      timestamp: '10:30 AM',
      count: 847,
      change: '+12',
      fullImage: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=1200&h=800&fit=crop'
    },
    {
      id: 2,
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=400&fit=crop',
      location: 'Arashiyama Bamboo Grove',
      timestamp: '2:15 PM',
      count: 23,
      change: '+3',
      fullImage: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200&h=800&fit=crop'
    },
    {
      id: 3,
      type: 'audio',
      thumbnail: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=400&h=400&fit=crop',
      location: 'Gion District',
      timestamp: '7:30 PM',
      count: 156,
      change: '+5',
      fullImage: 'https://images.unsplash.com/photo-1493787039806-2edcbe808750?w=1200&h=800&fit=crop'
    }
  ];

  const getSelectedTrip = () => {
    if (selectedTrip) {
      return trips.find(t => t.id === selectedTrip);
    }
    return trips[0];
  };

  const moods = [
    { id: 'nostalgic', emoji: '🌅', label: 'Nostalgic' },
    { id: 'cinematic', emoji: '🎬', label: 'Cinematic' },
    { id: 'dreamy', emoji: '✨', label: 'Dreamy' },
    { id: 'adventure', emoji: '⚡', label: 'Adventure' }
  ];

  return (
    <div className="min-h-screen bg-[#0B0E1F]">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute top-0 -left-40 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-40 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🌍</span>
              <span className="text-white font-semibold text-lg">TravelAILounge</span>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-medium hover:opacity-90 transition">
              + New Trip
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Active Journey Card */}
        <div className="mb-8 p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-white/50 text-sm mb-1">Active Journey</p>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {getSelectedTrip().destination}
              </h1>
              <p className="text-white/40">{getSelectedTrip().dates}</p>
            </div>
            <div className="flex gap-6 mt-4 md:mt-0">
              <div>
                <p className="text-white/50 text-sm">Memories</p>
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  {getSelectedTrip().memories}
                </p>
              </div>
              <div>
                <p className="text-white/50 text-sm">Stories</p>
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  {getSelectedTrip().stories}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trip Selector */}
        <div className="mb-8">
          <h2 className="text-white/70 text-sm font-medium mb-3">Your Trips</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {trips.map(trip => (
              <button
                key={trip.id}
                onClick={() => setSelectedTrip(trip.id)}
                className={`flex-shrink-0 w-48 p-4 rounded-xl border transition-all ${
                  selectedTrip === trip.id
                    ? 'bg-white/20 border-white/30'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <p className="text-white font-medium text-left">{trip.destination}</p>
                <p className="text-white/50 text-xs text-left mt-1">{trip.dates}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Memories */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {memoryHighlights.map((memory, idx) => (
                <div key={idx} className="p-5 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 hover:border-white/20 transition">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-2xl">
                      {memory.type === 'photo' ? '📷' : memory.type === 'video' ? '🎬' : '🎤'}
                    </span>
                    <span className="text-white/30 text-xs">{memory.timestamp}</span>
                  </div>
                  <p className="text-white/90 text-sm mb-1">{memory.location}</p>
                  <p className="text-white text-xl font-semibold">{memory.count}</p>
                  <p className="text-emerald-400 text-xs mt-1">+{memory.change} today</p>
                </div>
              ))}
            </div>

            {/* Memory Grid */}
            <div className="p-6 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-medium">Recent Memories</h3>
                <button className="text-white/40 text-sm hover:text-white/60">View All →</button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {memoryHighlights.map(memory => (
                  <button
                    key={memory.id}
                    onClick={() => {
                      setSelectedMemory(memory);
                      setShowMemoryModal(true);
                    }}
                    className="group relative aspect-square rounded-lg overflow-hidden"
                  >
                    <img 
                      src={memory.thumbnail} 
                      alt={memory.location}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-2 left-2 text-left">
                        <p className="text-white text-xs font-medium">{memory.location}</p>
                        <p className="text-white/60 text-xs">{memory.timestamp}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Daydream Mode (Prominent) */}
          <div className="space-y-6">
            {/* Daydream Card - Prominent with mood selector */}
            <div className="p-6 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-orange-500/20 backdrop-blur-xl rounded-xl border border-white/10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider">Featured</p>
                  <h2 className="text-white text-2xl font-bold mt-1">Daydream Mode</h2>
                </div>
                <span className="text-3xl">✨</span>
              </div>
              
              <p className="text-white/60 text-sm mb-6">
                Transform your memories into an immersive experience
              </p>

              {/* Mood Selector */}
              <div className="mb-6">
                <p className="text-white/40 text-xs mb-2">Select Mood</p>
                <div className="flex flex-wrap gap-2">
                  {moods.map(mood => (
                    <button
                      key={mood.id}
                      onClick={() => setDaydreamMood(mood.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                        daydreamMood === mood.id
                          ? 'bg-white text-gray-900'
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      <span className="mr-1">{mood.emoji}</span>
                      {mood.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview image (optional) */}
              <div className="relative mb-4 rounded-lg overflow-hidden h-32">
                <img 
                  src={getSelectedTrip().daydreamPreview} 
                  alt={getSelectedTrip().destination}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-2 left-2 text-white text-xs">
                  {getSelectedTrip().destination} preview
                </div>
              </div>

              <button 
                onClick={() => {
                  setSelectedTripForDaydream({
                    ...getSelectedTrip(),
                    mood: daydreamMood
                  });
                  setShowDaydream(true);
                }}
                className="w-full py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-white/90 transition flex items-center justify-center gap-2"
              >
                <span>▶️</span>
                Begin Your Daydream
              </button>

              <div className="flex justify-between mt-4 text-white/30 text-xs">
                <span>🎧 AI Narrated</span>
                <span>🎵 Personalized</span>
                <span>⏱️ 30 sec</span>
              </div>
            </div>

            {/* Generation Stats */}
            <div className="p-6 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10">
              <h3 className="text-white font-medium mb-4">AI Generation</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/60">Blog Posts</span>
                    <span className="text-white">12</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/60">Vlog Scripts</span>
                    <span className="text-white">8</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-1/2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/60">Photo Books</span>
                    <span className="text-white">5</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-2/5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Memory Modal */}
      {showMemoryModal && selectedMemory && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setShowMemoryModal(false)}
        >
          <div 
            className="bg-[#0B0E1F] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-white">{selectedMemory.location}</h2>
                <button 
                  onClick={() => setShowMemoryModal(false)}
                  className="text-white/60 hover:text-white/90 text-xl"
                >
                  ✕
                </button>
              </div>
              <img 
                src={selectedMemory.fullImage} 
                alt={selectedMemory.location}
                className="w-full rounded-lg mb-4"
              />
              <p className="text-white/70 text-sm mb-4">
                Captured on {selectedMemory.timestamp}
              </p>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-white/90">
                  Download
                </button>
                <button className="px-4 py-2 border border-white/20 text-white rounded-lg text-sm font-medium hover:bg-white/10">
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DaydreamExperience Modal - Imported from components */}
      {showDaydream && selectedTripForDaydream && (
        <DaydreamExperience 
          trip={selectedTripForDaydream}
          onClose={() => setShowDaydream(false)}
          audioSrc="my-soundtrack.mp3"  // or dynamic based on mood
        />
      )}

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default App;