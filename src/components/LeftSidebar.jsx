import React, { useState, useEffect } from 'react';

function Sidebar() {
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [artistName, setArtistName] = useState("ncs");
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [songName, setSongName] = useState(null)
  const [totalDuration, setTotalDuration] = useState(0);
  const [volume, setVolume] = useState(50)

  useEffect(() => {
    getSongs()
    getArtists()
  }, [artistName]);
  async function getSongs() {
    const response = await fetch(`http://localhost:5000/api/songs/${artistName}`);
    const data = await response.json();
    setSongs(data)
  }
  async function getArtists() {
    const response = await fetch("http://localhost:5000/api/artists");
    const data = await response.json();
    setArtists(data)
  }

  useEffect(() => {
    if (currentSong) {
      currentSong.addEventListener('loadedmetadata', () => {
        setTotalDuration(currentSong.duration);
      });

    }
  }, [currentSong]);


  const playMusic = (name, songUrl) => {
    console.log('Playing music:', songUrl);
    setSongName(name)

    if (currentSong && currentSong.src !== songUrl) {
      currentSong.pause();
      setIsPlaying(false);
    }


    if (currentSong && currentSong.src == songUrl) {
      if (isPlaying) {
        currentSong.pause();
      } else {
        currentSong.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      const newSong = new Audio(songUrl);
      newSong.addEventListener('timeupdate', () => setCurrentTime(newSong.currentTime));
      newSong.play();
      setCurrentSong(newSong);
      setIsPlaying(true);
    }
  };
  const onPause = () => {
    if (currentSong) {
      if (isPlaying) {
        currentSong.pause();
      } else {
        currentSong.play();
      }
      setIsPlaying(!isPlaying);
    }
  }

  const seek = (e) => {
    if (currentSong) {
      const newPosition = e.nativeEvent.offsetX / e.target.offsetWidth;
      setCurrentTime(newPosition * currentSong.duration);
      currentSong.currentTime = newPosition * currentSong.duration;
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (currentSong) {
      currentSong.volume = newVolume;
    }
  };

  const toggleMute = () => {
    if (currentSong) {
      if (currentSong.volume === 0) {
        // Unmute
        currentSong.volume = volume;
      } else {
        // Mute
        currentSong.volume = 0;
      }
      setVolume(currentSong.volume);
    }
  };

  function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }



  return (
    <div className="container flex bg-black">
      <div className="left">
        <div className="close">
          <img className="invert" width="30" src="img/close.svg" alt="" />
        </div>
        <div className="home margin bg-grey radius p-1">
          <img className="invert" width="120" src="img/logo.svg" alt="logo" />
          <ul>
            <li><img className="invert" src="img/home.svg" alt="home" />Home</li>
            <li><img className="invert" src="img/search.svg" alt="search" />Search</li>
          </ul>
        </div>
        <div className="library bg-grey radius margin p-1">
          <div className="heading">
            <img className="invert" src="img/playlist.svg" alt="playlist" />
            <h2>Your Library</h2>
          </div>
          <div className="songList">
            <ul>
              {songs.length > 0 && songs.map(song => (
                <li key={song._id}>
                  <img className="invert" src="img/music.svg" alt="" />
                  <div className="info">
                    <div>{song.name}</div>
                    <div className="artist">{song.artist.name}</div>
                  </div>
                  <div className="playnow" onClick={() => playMusic(song.name, song.url)}>
                    <span>{currentSong && currentSong.src === `${song.url}` && isPlaying ? 'Pause' : 'Play'}</span>
                    <img className="invert" src={`img/${currentSong && currentSong.src === `${song.url}` && isPlaying ? 'pause' : 'play2'}.svg`} alt="" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer">
            <div><a href="https://www.spotify.com/in-en/legal/"><span>Legal</span></a></div>
            <div><a href="https://www.spotify.com/in-en/safetyandprivacy/"><span>Safety & Privacy Center</span></a></div>
            <div><a href="https://www.spotify.com/in-en/legal/privacy-policy/"><span>Privacy Policy</span></a></div>
            <div><a href="https://www.spotify.com/in-en/legal/cookies-policy/"><span>Cookies</span></a></div>
            <div><a href="https://www.spotify.com/in-en/legal/privacy-policy/#s3"><span>About Ads</span></a></div>
            <div><a href="https://www.spotify.com/in-en/accessibility/"><span>Accessibility</span></a></div>
          </div>
        </div>
      </div>
      <div className="right margin bg-grey radius">
        <div className="header radius">
          <div className="nav">
            <div className="hamburgericon">
              <img width="40" className="hamburger invert" src="img/hamburger.svg" alt="" />
              <svg xmlns="http://www.w3.org/2000/svg" className="invert" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                <path d="M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="invert" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                <path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div className="button">
            <button className="signup"><a href="/signup.html">Sign Up</a></button>
            <button className="login"><a href="/login.html">Log in</a></button>
          </div>
        </div>
        <div className="spotifyPlaylist">
          <h2>Playlist</h2>
          <div className="cardContainer">
            {artists.map(artist => (
              <div data-folder={artist._id} className="cards radius2" key={artist._id}>
                <div className="playbutton" onClick={() => setArtistName(artist.name)}>
                  <img src="img/playbutton.svg" alt="" />
                </div>
                <img src={`http://localhost:5000/${artist.image}`} alt="" />
                <h2>{artist.name}</h2>
                {/* <p>${response.description}</p> */}
              </div>
            ))}
          </div>
        </div>
        <div className="playbar">
          {/* Seekbar */}
          <div className="seekbar" onClick={seek}>
            <div className="circle" style={{ width: `${(currentTime / currentSong?.duration) * 100}%` }}></div>
          </div>
          {/* Above bar */}
          <div className="abovebar">
            {/* Song info */}
            <div className="songinfo">{songName}</div>
            {/* Play controls */}
            <div className="playComp">
              {/* Previous song button */}
              <img id="prevSong" width="35" src="img/previous.svg" alt="" />
              {/* Play/pause button */}
              <img className="invert" onClick={onPause} src={`img/${isPlaying ? 'pause' : 'play2'}.svg`} alt="" />
              {/* Next song button */}
              <img id="nextSong" width="35" src="img/next.svg" alt="" />
            </div>
            {/* Time and volume controls */}
            <div className="timeVolume">
              {/* Current time */}
              <div className="songtime">{formatTime(currentTime)} / {formatTime(totalDuration)}</div>
              {/* Volume control */}
              <div className="volume">
                {/* Mute button */}
                <img className="invert" width="30" src="img/volume.svg" alt="" onClick={toggleMute} />
                {/* Volume slider */}
                <div className="range">
                  <input type="range" name="volume" id="" min="0" max="1" step="0.1" value={volume} onChange={handleVolumeChange} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Sidebar;
