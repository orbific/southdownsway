// StoriesPage.tsx
import React, { useState, useEffect } from 'react';
import data from './sdw.json';
import collections from './collections.json';
import './App.css';

type Story = {
    id: string;
    title: string;
    characters?: string[];
    collection?: string;
    URL?: string;
    words?: string;
    distanceAlongTrail?: number;
    location?: string;
};

type Collection = {
    id: string;
    title: string;
    URL?: string;
};

const typedCollections: Collection[] = collections.collections.sort((a, b) => parseInt(a.id) - parseInt(b.id));


const StoriesPage: React.FC = () => {
    const [stories, setStories] = useState<Story[]>([]);
        const [visibleCollections, setVisibleCollections] = useState<Record<string, boolean>>({});

        useEffect(() => {
            setStories(data.stories);
        }, []);

        const toggleVisibility = (collection: string) => {
            setVisibleCollections(prevState => ({
                ...prevState,
                [collection]: !prevState[collection]
            }));
        };

        const categorizedStories = stories
            .filter(story => story.collection && typedCollections.find(col => col.title === story.collection)?.URL)
            .sort((a, b) => parseInt(b.id) - parseInt(a.id));

        const uncategorizedStories = stories
            .filter(story => !story.collection || !typedCollections.find(col => col.title === story.collection)?.URL)
            .sort((a, b) => parseInt(a.id) - parseInt(b.id));


return (

    <div className="App">
        {Object.entries(
            categorizedStories.reduce((acc, story) => {
                const collection = story.collection!;
                if (!acc[collection]) {
                    acc[collection] = [];
                }
                acc[collection].push(story);
                return acc;
            }, {} as Record<string, Story[]>)
        ).map(([collection, stories]) => (
            <div key={collection}>
                <h2>
                    {/*<button onClick={() => toggleVisibility(collection)} className="toggle-button">*/}
                    {/*    <i className={`fas ${visibleCollections[collection] ? 'fa-minus' : 'fa-plus'}`}></i>*/}
                    {/*</button>*/}
                    <span onClick={() => toggleVisibility(collection)} className="toggle-button">
                            <span style={{fontFamily: 'sans-serif'}}>{visibleCollections[collection] ? 'v' : '>'}</span>
                        </span>
                    <a href={typedCollections.find((col: Collection) => col.title === collection)?.URL}
                       target="_blank" rel="noopener noreferrer">
                        {collection}
                    </a>
                </h2>
                {visibleCollections[collection] && (
                    <ul>
                        {stories.map((story, index) => (
                            <li key={index} className="indented-stories">
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
                )}
            </div>
        ))}
        <div>
            <ul>
                {uncategorizedStories.map((story, index) => (
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
    </div>
);
};

export default StoriesPage;
