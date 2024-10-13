import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

const JokeGenerator = () => {
  const [joke, setJoke] = useState({ setup: '', punchline: '' });
  const [loading, setLoading] = useState(true);
  const [showPunchline, setShowPunchline] = useState(false);

  const fetchJoke = async () => {
    setLoading(true);
    setShowPunchline(false);
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');
      const data = await response.json();
      setJoke({ setup: data.setup, punchline: data.punchline });
    } catch (error) {
      console.error('Error fetching joke:', error);
      setJoke({ setup: 'Error fetching joke', punchline: 'Please try again' });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-purple-500">
      <div className="max-w-md w-full p-6 rounded-lg border-2 border-purple-500 shadow-lg shadow-purple-500/50">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-400">Joke Generator</h1>
        {loading ? (
          <div className="text-center">
            <RefreshCw className="animate-spin h-8 w-8 mx-auto text-purple-500" />
          </div>
        ) : (
          <>
            <p className="text-xl mb-4">{joke.setup}</p>
            {showPunchline && <p className="text-xl font-bold mb-6">{joke.punchline}</p>}
            {!showPunchline && (
              <button
                onClick={() => setShowPunchline(true)}
                className="w-full py-2 px-4 bg-purple-700 text-white rounded hover:bg-purple-600 transition-colors mb-4"
              >
                Reveal Punchline
              </button>
            )}
          </>
        )}
        <button
          onClick={fetchJoke}
          className="w-full py-2 px-4 bg-purple-500 text-black rounded hover:bg-purple-400 transition-colors"
        >
          New Joke
        </button>
      </div>
    </div>
  );
};

export default JokeGenerator;