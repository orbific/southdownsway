import { useState, useEffect } from 'react';
import './App.css';
import data from './sdw.json';  // Importing the JSON file directly

type Story = {
    id: string;
    title: string;
    characters: string[];
    collection: string;
    URL?: string;
    words?: string;
    distanceAlongTrail?: number;
    location?: string;
};

function App() {
    const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    // Check if data is loaded correctly, otherwise use default data

    setStories(data.stories );
  }, []);

  return (
    <div className="App">
      <h1>The South Downs Way: Stories</h1>
      <ul>
        {stories.map((story, index) => (
          <li key={index}>
            {story.URL ? (
              <a href={story.URL} target="_blank" rel="noopener noreferrer">
                {story.title}
              </a>
            ) : (
              <span>{story.title}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

