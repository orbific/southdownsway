import React, { useState, useEffect } from 'react';
import './App.css';
import data from './sdw.json';  // Importing the JSON file directly

function App() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    // Check if data is loaded correctly, otherwise use default data
    setStories(data.stories || [
      { title: "Default Story 1", URL: "https://default1.com" },
      { title: "Default Story 2" },
      { title: "Default Story 3", URL: "https://default3.com" }
    ]);
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

