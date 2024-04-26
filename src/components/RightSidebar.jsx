import React, {useState, useEffect} from 'react';

function RightSidebar() {

  const [playlist, setPlaylist] = useState([]);


  useEffect(() => {
    async function getSongs() {
      const response = await fetch("http://localhost:5000/api/artists");
      const data = await response.json();
      setPlaylist(data)
    }
    getSongs()
  }, []);


  return (
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
          {playlist.map(song => (
            <div data-folder={song._id} className="cards radius2 ">
              <div className="playbutton">
                <img src="img/playbutton.svg" alt=""/>
              </div>
              <img src={`http://localhost:5000/${song.image}`} alt=""/>
                <h2>{song.name}</h2>
                {/* <p>${response.description}</p> */}
            </div>
          ))}
        </div>
      </div>
      <div className="playbar">
        <div className="seekbar">
          <div className="circle"></div>
        </div>
        <div className="abovebar">
          <div className="songinfo"></div>
          <div className="playComp">
            <img id="prevSong" width="35" src="img/previous.svg" alt="" />
            <img id="playSong" width="35" src="img/play2.svg" alt="" />
            <img id="nextSong" width="35" src="img/next.svg" alt="" />
          </div>
          <div className="timeVolume">
            <div className="songtime"></div>
            <div className="volume">
              <img className="invert" width="30" src="img/volume.svg" alt="" />
              <div className="range">
                <input type="range" name="volume" id="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightSidebar;
