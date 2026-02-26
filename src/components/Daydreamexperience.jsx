import React, { useState, useEffect, useRef } from 'react';

const DaydreamExperience = ({ trip, onClose, audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const [narration, setNarration] = useState('');
  const [isGenerating, setIsGenerating] = useState(true);
  const [volume, setVolume] = useState(70);
  const [showTranscript, setShowTranscript] = useState(false);
  
  const audioRef = useRef(null);
  const containerRef = useRef(null);

  // Sample AI-generated narration for Kyoto
  const scenes = [
    {
      text: "The ancient pathways of Kyoto whisper stories of a thousand years...",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&h=800&fit=crop",
    },
    {
      text: "Golden pavilions reflect in mirror ponds, where time itself seems to stand still...",
      image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&h=800&fit=crop",
    },
    {
      text: "Bamboo forests sway gently, creating nature's own symphony of light and shadow...",
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200&h=800&fit=crop",
    },
    {
      text: "Geishas glide through Gion's lantern-lit streets, carrying traditions through the ages...",
      image: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=1200&h=800&fit=crop",
    },
    {
      text: "Zen gardens teach us that in simplicity, we find the deepest peace...",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&h=800&fit=crop",
    }
  ];

  // Simulate AI generating narration
  useEffect(() => {
    setIsGenerating(true);
    setTimeout(() => {
      setNarration(scenes[0].text);
      setIsGenerating(false);
    }, 2000);

    // Auto-advance scenes every 6 seconds
    const interval = setInterval(() => {
      setCurrentScene(prev => (prev + 1) % scenes.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Update narration text when scene changes
  useEffect(() => {
    setNarration(scenes[currentScene].text);
  }, [currentScene]);

  // Handle play/pause
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error('Audio play failed:', e));
    }
    setIsPlaying(!isPlaying);
  };

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrolled = window.scrollY;
        const parallaxElements = document.querySelectorAll('.parallax-bg');
        parallaxElements.forEach((el, index) => {
          const speed = 0.5 + (index * 0.1);
          el.style.transform = `translateY(${scrolled * speed}px)`;
        });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-y-auto" ref={containerRef}>
      {/* Close button */}
      <button 
        onClick={() => {
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
          onClose();
        }}
        className="fixed top-6 right-6 z-50 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 backdrop-blur-sm transition"
      >
        ✕
      </button>

      {/* Volume control */}
      <div className="fixed bottom-6 right-6 z-50 bg-white/10 backdrop-blur-sm rounded-full p-2 flex items-center gap-2">
        <span className="text-white ml-2">🔊</span>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          className="w-24 accent-purple-500"
        />
      </div>

      {/* Transcript toggle */}
      <button 
        onClick={() => setShowTranscript(!showTranscript)}
        className="fixed bottom-6 left-6 z-50 bg-white/10 hover:bg-white/20 text-white rounded-full px-4 py-2 backdrop-blur-sm transition flex items-center gap-2"
      >
        <span>📜</span>
        {showTranscript ? 'Hide' : 'Show'} Transcript
      </button>

      {/* Hidden audio element */}
      <audio 
        ref={audioRef} 
        src={audioSrc || '/soundtrack.mp3'} 
        loop 
        preload="auto"
      />

      {/* Background layers with parallax */}
      {scenes.map((scene, index) => (
        <div 
          key={index}
          className={`parallax-bg fixed inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            currentScene === index ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${scene.image})` }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      ))}

      {/* Main content */}
      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl text-center text-white">
          <div className="mb-8 animate-fade-in">
            <span className="text-sm uppercase tracking-widest text-purple-300">Daydream Mode</span>
            <h2 className="text-5xl font-bold mt-2 mb-4">{trip?.destination || 'Kyoto, Japan'}</h2>
            <div className="flex items-center justify-center gap-4 text-sm">
              <span>📅 March 2024</span>
              <span className="w-1 h-1 bg-white/50 rounded-full"></span>
              <span>⏱️ 30 sec journey</span>
            </div>
          </div>

          {isGenerating ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-purple-300">AI is composing your memory soundtrack...</p>
            </div>
          ) : (
            <>
              <div className="text-2xl md:text-4xl font-light leading-relaxed mb-6 animate-slide-up">
                "{narration}"
              </div>
              
              <button 
                onClick={togglePlay}
                className="bg-white text-purple-900 rounded-full p-6 hover:scale-110 transition transform shadow-2xl"
              >
                {isPlaying ? '⏸️' : '▶️'}
              </button>

              {isPlaying && (
                <div className="mt-4 flex justify-center gap-1">
                  <div className="w-1 h-4 bg-purple-500 animate-pulse"></div>
                  <div className="w-1 h-6 bg-purple-500 animate-pulse delay-100"></div>
                  <div className="w-1 h-8 bg-purple-500 animate-pulse delay-200"></div>
                  <div className="w-1 h-6 bg-purple-500 animate-pulse delay-300"></div>
                  <div className="w-1 h-4 bg-purple-500 animate-pulse delay-400"></div>
                </div>
              )}
            </>
          )}

          {/* Progress bar (simulated) */}
          <div className="max-w-md mx-auto mt-8">
            <div className="flex justify-between text-xs text-white/60 mb-2">
              <span>0:00</span>
              <span>0:30</span>
            </div>
            <div className="h-1 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"
                style={{ width: `${(currentScene + 1) * 20}%` }}
              ></div>
            </div>
          </div>

          {/* Scene indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {scenes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentScene(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentScene === index 
                    ? 'w-8 bg-purple-500' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Transcript panel */}
      {showTranscript && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md text-white p-6">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>📜</span> AI-Generated Narration Transcript
            </h3>
            <div className="space-y-4">
              {scenes.map((scene, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg transition ${
                    currentScene === index ? 'bg-purple-900/50 border-l-4 border-purple-500' : ''
                  }`}
                >
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-purple-400 font-mono">0:{index * 6}</span>
                    <p>{scene.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Right sidebar visualization */}
      <div className="absolute top-1/2 right-8 transform -translate-y-1/2 hidden lg:block">
        <div className="space-y-3">
          {scenes.map((scene, index) => (
            <div 
              key={index}
              className={`flex items-center gap-2 text-sm transition-all ${
                index <= currentScene ? 'text-white' : 'text-white/30'
              }`}
            >
              <span className="w-16 text-right font-mono text-xs">{index * 6}s</span>
              <div className={`w-2 h-2 rounded-full ${
                index <= currentScene ? 'bg-purple-500' : 'bg-white/20'
              }`}></div>
              <span>scene {index + 1} ✦</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DaydreamExperience;