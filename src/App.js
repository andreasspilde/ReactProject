import './App.css';
import React, { useState } from 'react'
import BildeTilBruk from './BildeTilBruk';
import Split from './SplitImage';
//import axios from 'axios'

function App() {
  const [image, setImage] = useState('')
  
  function handleChange(e){
    const file = e.target.files[0]
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onloadend = function (e){
      setImage(reader.result);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <BildeTilBruk imgSrc={image} />
        <input  multiple={false} type = 'file' src = 'file' accept = 'image/*' onChange={handleChange} />
        <Split imageSrc={image} />
      </header>
    </div>
  );
}

export default App;
