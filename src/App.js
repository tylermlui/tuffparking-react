import './App.css';
import {useEffect, useState} from 'react';

function App() {
  // Create a single state object to hold all structures
  const [parkingData, setParkingData] = useState({
    eastsideNorth: [],
    eastsideSouth: [],
    nutWood: [],
    freeChurch: [],
    lotAG: [],
    stateCollege: [],
  });

  // Fetch data and update state
  async function req() {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch("https://tuffparking.up.railway.app/scrape", requestOptions);
      const result = await response.json();

      setParkingData({
        eastsideNorth: [result["Eastside North"]["availability"], result["Eastside North"]["fade_percentage"], result["Eastside North"]["last_update"], result["Eastside North"]["time"], result["Eastside North"]["total_spaces"]],
        eastsideSouth: [result["Eastside South"]["availability"], result["Eastside South"]["fade_percentage"], result["Eastside South"]["last_update"], result["Eastside South"]["time"],result["Eastside South"]["total_spaces"]],
        nutWood: [result["Nutwood Structure"]["availability"], result["Nutwood Structure"]["fade_percentage"], result["Nutwood Structure"]["last_update"], result["Nutwood Structure"]["time"],result["Eastside North"]["total_spaces"]],
        freeChurch: [result["Fullerton Free Church"]["availability"], result["Fullerton Free Church"]["fade_percentage"], result["Fullerton Free Church"]["last_update"], result["Fullerton Free Church"]["time"], result["Eastside North"]["total_spaces"]],
        lotAG: [result["Lot A & G"]["availability"], result["Lot A & G"]["fade_percentage"], result["Lot A & G"]["last_update"], result["Lot A & G"]["time"], result["Eastside North"]["total_spaces"]],
        stateCollege: [result["State College Structure"]["availability"], result["State College Structure"]["fade_percentage"], result["State College Structure"]["last_update"], result["State College Structure"]["time"], result["Eastside North"]["total_spaces"]],
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }
  useEffect(()=>{
    req();
    let timerId = setInterval(() =>{
      req();
    }, 200000);

    return () => {
      clearInterval(timerId);
    }
  },[]);

  return (
    <div className="App">
      <header className="App-header" >
          <div>
          <div>
            <h2>Eastside North</h2>
            <p>Spaces: {parkingData.eastsideNorth[0]}</p>
            <p>Last Updated: {parkingData.eastsideNorth[2]}</p>
            <p>{parkingData.eastsideNorth[3]}</p>
            <p>Total Spaces: {parkingData.eastsideNorth[4]}</p>

          </div>
          <div>
            <h2>Eastside South</h2>
            <p>{parkingData.eastsideSouth[0]}</p>
            <p>{parkingData.eastsideSouth[2]}</p>
            <p>{parkingData.eastsideSouth[3]}</p>
            <p>{parkingData.eastsideSouth[4]}</p>

          </div>
          <div>
            <h2>Nutwood</h2>
            <p>{parkingData.nutWood[0]}</p>
            <p>{parkingData.nutWood[2]}</p>
            <p>{parkingData.nutWood[3]}</p>
            <p>{parkingData.nutWood[4]}</p>

          </div>
          <div>
            <h2>Free Church</h2>
            <p>{parkingData.freeChurch[0]}</p>
            <p>{parkingData.freeChurch[2]}</p>
            <p>{parkingData.freeChurch[3]}</p>
            <p>{parkingData.freeChurch[4]}</p>

          </div>
          <div>
            <h2>State College</h2>
            <p>{parkingData.stateCollege[0]}</p>
            <p>{parkingData.stateCollege[2]}</p>
            <p>{parkingData.stateCollege[3]}</p>
            <p>{parkingData.stateCollege[4]}</p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
