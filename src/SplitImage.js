import React, { useState, useEffect } from 'react'

function Split({ imageSrc }){
    const [bilder , setBilder] = useState([]);
    const ImageSplitter = (img) => {
        var image = new Image();
        image.onload = () => {
            const outArray = [];

            const width = image.width;
            const height = image.height;
            const w = width / 4;
            const h = height / 4;
            var z = 0
            for (let i = 0; i < 4; i++) {
                for(let y = 0; y < 4; y++){
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(image, y * w, i * h, w, h, -1, -1, 175, 175);
                    
                    if(z===15){
                        ctx.fillRect(0,0,175,175)
    
                    }
                    outArray[z] =  [canvas.toDataURL(),z];

                    z = z+1
                }
            }
            outArray.sort(() => (Math.random()> .5 )? 1: -1);
            setBilder(outArray);
        };

        image.src = img;
    };
    
    useEffect(() => {
        if (imageSrc) ImageSplitter(imageSrc);
    }, [imageSrc]);

    function handleClick(nmbr){
        var hvorvier = -1
        var bytt = 0
        for(let i=0; i<16; i++){
            if(bilder[i][1] === nmbr){hvorvier = i}
            if(bilder[i][1] === 15){bytt = i}
        }
        var old = new Array([])
        old = [...bilder];
        if(hvorvier+1 === bytt){
            var hold = bilder[bytt]
            old[bytt] = bilder[hvorvier]
            old[hvorvier] = hold
        }
        if(hvorvier-1 === bytt){
            hold = bilder[bytt]
            old[bytt] = bilder[hvorvier]
            old[hvorvier] = hold
        }
        if(hvorvier+4 === bytt){
            hold = bilder[bytt]
            old[bytt] = bilder[hvorvier]
            old[hvorvier] = hold
        }
        if(hvorvier-4 === bytt){
            hold = bilder[bytt]
            old[bytt] = bilder[hvorvier]
            old[hvorvier] = hold
        }
        setBilder(old)
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
                <h1>Winner!</h1>
                <div class="tullball">
                    {bilder.map((x) => (
                    <img key = 'x[0]' alt = 'x1' src = {x[0]}/>
                    ))}
                </div>
            </div>
        )
    }
    else{
        return(
            <div class="tullball">
                {bilder.map((x) => (
                    <img key='x[0]' alt ='x1' src = {x[0]} onClick={() => handleClick(x[1])}/>
                ))}
            </div>
        );
    }
}
export default Split;