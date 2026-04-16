// StoriesPage.tsx
import React, { useState, useEffect } from 'react';
import data from './sdw.json';
import collections from './collections.json';
import './App.css';

type Story = {
    id: string;
    title: string;
    characters?: string[];
    collection?: string | string[];
    URL?: string;
    words?: string;
    distanceAlongTrail?: number;
    location?: string;
};

const getCollections = (story: Story): string[] => {
    if (!story.collection) return [];
    return Array.isArray(story.collection) ? story.collection : [story.collection];
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
            .filter(story => getCollections(story).length > 0)
            .sort((a, b) => parseInt(a.id) - parseInt(b.id));

        const uncategorizedStories = stories
            .filter(story => getCollections(story).length === 0)
            .sort((a, b) => parseInt(a.id) - parseInt(b.id));


return (

    <div className="App">
        {typedCollections.map(col => {
            const stories = categorizedStories.filter(story => getCollections(story).includes(col.title));
            if (stories.length === 0) return null;
            const collection = col.title;
            return (
            <div key={collection} className="collection-section">
                <h2
                    onClick={() => toggleVisibility(collection)}
                    className="collection-heading"
                    aria-expanded={!!visibleCollections[collection]}
                >
                    <i className={`fas fa-chevron-right collection-chevron ${visibleCollections[collection] ? 'expanded' : ''}`}></i>
                    {typedCollections.find((col: Collection) => col.title === collection)?.URL ? (
                        <a href={typedCollections.find((col: Collection) => col.title === collection)?.URL}
                           target="_blank" rel="noopener noreferrer"
                           onClick={e => e.stopPropagation()}>
                            {collection}
                        </a>
                    ) : (
                        <span>{collection}</span>
                    )}
                </h2>
                <ul className={`story-list ${visibleCollections[collection] ? 'visible' : ''}`}>
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
            </div>
            );
        })}
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
