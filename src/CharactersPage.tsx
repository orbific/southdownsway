import React, { useEffect, useState } from 'react';
import sdwData from './sdw.json';
import charactersData from './characters.json';

type Story = {
    id: string;
    title: string;
    characters?: string[];
};

type Character = {
    id?: string;
    name: string;
    description?: string;
};

const CharactersPage: React.FC = () => {
    const [characters, setCharacters] = useState<Character[]>([]);

    useEffect(() => {
        // Extract characters from sdw.json
        const stories: Story[] = sdwData.stories;
        const allCharacterNames = Array.from(
            new Set(stories.flatMap(story => story.characters || []))
        );

        // Combine with characters.json
        const combinedCharacters = allCharacterNames.map(name => {
            const characterInfo = charactersData.characters.find(char => char.name === name);
            return {
                id: characterInfo?.id,
                name,
                description: characterInfo?.description,
                stories: stories.filter(story => story.characters?.includes(name))
            };
        });

        // Sort by ID (numerically) and then alphabetically by name
        combinedCharacters.sort((a, b) => {
            if (a.id && b.id) {
                return parseInt(a.id) - parseInt(b.id);
            }
            if (a.id) return -1;
            if (b.id) return 1;
            return a.name.localeCompare(b.name);
        });

        setCharacters(combinedCharacters);
    }, []);

    return (
        <div>
            <h1>Characters</h1>
            {characters.map(character => (
                <div key={character.name}>
                    <h2>{character.name}</h2>
                    {character.description && <p style={{ fontStyle: 'italic', textAlign: 'left' }}>{character.description}</p>}
                    <ul>
                        {character.stories.map(story => (
                            <li key={story.id}>
                                {story.URL ? (
                                    <a href={story.URL} target="_blank" rel="noopener noreferrer">• {story.title}</a>
                                ) : (
                                    <>• {story.title}</>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default CharactersPage;