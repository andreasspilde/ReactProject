import './App.css';
import React, { useState } from 'react'
import BildeTilBruk from './BildeTilBruk';
import Split from './SplitImage';
import axios from 'axios'

function App() {
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
    axios({
      method: 'get',
      url: "https://picsum.photos/300"
      })
      .then(res => {
        setImage(res.request.responseURL);
      })
    }

  return (
    <div className="App">
      <header className="App-header">
        <BildeTilBruk imgSrc={image} className="test"/>
        <input  multiple={false} type = 'file' src = 'file' accept = 'image/*' onChange={handlePictureUpload} />
        <button onClick = {getPictureFromAPI}> Get a random picture</button>
        <Split imageSrc={image} />
      </header>
    </div>
  );
}

export default App;
