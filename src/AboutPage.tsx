import React from 'react';
import './App.css';
import data from './sdw.json';

const storyCount = data.stories.length;
const totalWords = data.stories.reduce((sum, story) => sum + (story.words ? parseInt(story.words) : 0), 0);

const AboutPage: React.FC = () => {
    return (
        <div className="about-page">
            <p>The South Downs Way is a collection of short stories set along the 100-mile South Downs Way path.</p>
            <p>Stories are sent out on <a href="https://microfictions.substack.com">my weekly email</a>. The stories are available in a series of physical zines available from <a href="https://orbific.etsy.com/">my Etsy store</a>.</p>
            <p>There are {storyCount} stories in this series, with a total word count of {totalWords.toLocaleString()}.</p>
        </div>
    );
};

export default AboutPage;