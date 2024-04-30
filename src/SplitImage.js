import React, { useState, useEffect } from 'react'

//TODO, sjekke at brettet er løsbart
function Split({ imageSrc }){
    const [bilder , setBilder] = useState([]);
    const [count , setCount] = useState(0);
    let antBilder = 4;
    let piksels = 700;
    const ImageSplitter = (img) => {
        var image = new Image();
        image.setAttribute('crossorigin', 'anonymous');
        piksels = piksels/antBilder;
        image.onload = () => {
            const outArray = [];
            const width = image.width;
            const height = image.height;
            const w = width / antBilder;
            const h = height / antBilder;
            var z = 0
            for (let i = 0; i < antBilder; i++) {
                for(let y = 0; y < antBilder; y++){
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(image, y * w, i * h, w, h, -1, -1, piksels, piksels);
                    
                    if(z===15){
                        ctx.fillRect(0,0,piksels,piksels)
    
                    }
                    outArray[z] =  [canvas.toDataURL(),z];

                    z = z+1
                }
            }
            outArray.sort(() => (Math.random()> .5 )? 1: -1);
            setBilder(outArray);
            setCount(0);
        };

        image.src = img;
    };
    
    useEffect(() => {
        if (imageSrc) ImageSplitter(imageSrc);
    }, [imageSrc]);

    function handleClick(nmbr){
        var whereWeAre = -1
        var canChange = 0
        var teller = count;
        for(let i=0; i<16; i++){
            if(bilder[i][1] === nmbr){whereWeAre = i}
            if(bilder[i][1] === 15){canChange = i}
        }
        var old = new Array([])
        old = [...bilder];
        if(whereWeAre+1 === canChange){
            var hold = bilder[canChange]
            old[canChange] = bilder[whereWeAre]
            old[whereWeAre] = hold
            teller = count + 1
        }
        if(whereWeAre-1 === canChange){
            hold = bilder[canChange]
            old[canChange] = bilder[whereWeAre]
            old[whereWeAre] = hold
            teller = count + 1
        }
        if(whereWeAre+4 === canChange){
            hold = bilder[canChange]
            old[canChange] = bilder[whereWeAre]
            old[whereWeAre] = hold
            teller = count + 1
        }
        if(whereWeAre-4 === canChange){
            hold = bilder[canChange]
            old[canChange] = bilder[whereWeAre]
            old[whereWeAre] = hold
            teller = count + 1
        }
        setBilder(old)
        setCount(teller)
    }

    function victory(){
        if(bilder.length < 1){
            return false
        }
        var i = 1
        for(i; i< bilder.length; i++){
            if(bilder[i][1] < bilder[i-1][1]){
                return false
            }
        }
        return true
    }

    if(victory()){
        return(
            <div>
                <h1>Winner! with {count} moves</h1>
                <div className="tullball">
                    {bilder.map((x) => (
                    <img key = {x[1]} alt = 'x1' src = {x[0]}/>
                    ))}
                </div>
            </div>
        )
    }
    else{
        return(
            <div>
                <h1> Number of moves {count}</h1>
                <div className="tullball">
                    {bilder.map((x) => (
                        <img key={x[1]} alt ='x1' src = {x[0]} onClick={() => handleClick(x[1])}/>
                    ))}
                </div>
            </div>
        )
    }
}
export default Split;