import './App.css';
import React, { useState } from 'react'
import BildeTilBruk from './BildeTilBruk';
import Split from './SplitImage';
import axios from 'axios'

//TODO:
//Legge inn sjekk for umulige brett
//Lage side nr to
//Lage "solver" for side nr en

function App() {
  const [sideTall, setSidetall] = useState(1)
  const [image, setImage] = useState('')
  
  function handlePictureUpload(e){
    const file = e.target.files[0]
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onloadend = function (e){
      setImage(reader.result);
      console.log(reader.result);
    }
  }

  function getPictureFromAPI(){
    let myImg = new Image();
    axios({
      method: 'get',
      url: "https://picsum.photos/300"
      })
      .then(res => {
        myImg = res.request.responseURL
        setImage(myImg);
      })
    }
  if(sideTall === 1){
    //Side en, 
    return (
      <div className="App">
        <header className = "Navbar">
        <button onClick={() => setSidetall(1)}> Page 1 </button>
        <button onClick={() => setSidetall(2)}> Page 2 </button>
        </header>
        <header className="App-header">
          <BildeTilBruk imgSrc={image} className="test"/>
          <input  multiple={false} type = 'file' src = 'file' accept = 'image/*' onChange={handlePictureUpload} />
          <button onClick = {getPictureFromAPI}> Get a random picture</button>
          <Split imageSrc={image} />
      </header>
    </div>
  );
}
if(sideTall === 2){
  return ( 
    <div className = "App">
      <header className = "Navbar">
        <button onClick={() => setSidetall(1)}> Page 1 </button>
        <button onClick={() => setSidetall(2)}> Page 2 </button>
        </header>
      <header className = "App-header">

      </header>
    </div>
  )
}
}
export default App;
