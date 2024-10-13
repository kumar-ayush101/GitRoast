import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [username, setUserName] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUserData(null);

    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setUserData(response.data);
    } catch (error) {
      setError('User Not Found');
    }
    setLoading(false);
  };

  const getRoast = (name, followers, repos) => {
    const roasts = [
      `${name}, with your ${followers} followers, you're all set to conquer the coding world! But maybe check your ${repos} repositories first—one repo for every day of the week, right? You're like the Github version of a hidden gem! Keep shining, buddy! 😄`,
      
      `Hey ${name}, changing the README file and calling yourself an open-source contributor, huh? With ${followers} followers, you're on your way to fame! Just make sure your repo count (${repos}) can keep up with your growing fan base. You're basically the next big thing, right? 😎`,
      
      `${name}, your profile name is cooler than your ${repos} repos. But don't worry, you're just one tutorial away from coding greatness! Keep up the grind, champ—you're almost there! 🤓`,
      
      `Yo ${name}, your profile name is unique, just like your ${followers} followers. But don't forget to add a few more repos! The open-source world is ready for your magic touch—don't leave them hanging! 💪`,
      
      `Hey ${name}, with those ${followers} and a shiny ${repos} repos, you're the hidden treasure of Github! Just a few more commits and you'll be running the coding show. Keep it up, genius! 🚀`,
    ];
    
    return roasts[Math.floor(Math.random() * roasts.length)];
  };

  return (
    <div className="App">
      <h1>GitHub Profile Roaster</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={username} placeholder="Enter GitHub username" />
        <button type="submit" disabled={!username} className="search">
          Search
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {userData && (
        <div className="user-profile">
          <img src={userData.avatar_url} alt="avatar" style={{ width: '100px' }} />
          <h2>{userData.name}</h2>
          <p>{userData.bio}</p>
          <p>Followers: {userData.followers}</p>
          <p>Repos: {userData.public_repos}</p>
          <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
            View Profile
          </a>
          <div className="roast-message">{getRoast(userData.name, userData.followers, userData.public_repos)}</div>
        </div>
      )}
    </div>
  );
}

export default App;
