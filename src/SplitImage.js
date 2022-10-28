import React, { useState, useEffect } from 'react'

function Split({ imageSrc }){
    const [bilder , setBilder] = useState([]);
    const ImageSplitter = (img) => {
        var image = new Image();
        image.onload = () => {
            const outArray = [];

            const width = image.width;
            const height = image.height;
            const w = width / 3;
            const h = height / 3;
            var z = 0
            for (let i = 0; i < 3; i++) {
                for(let y = 0; y < 3; y++){
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(image, y * w, i * h, w, h, -1, -1, 200, 200);
                    outArray[z] =  [canvas.toDataURL(),z];
                    z = z+1
                }
            }
            //TODO lage siste bildet hvit/svart
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
        for(let i=0; i<9; i++){
            if(bilder[i][1] === nmbr){hvorvier = i}
            if(bilder[i][1] === 8){bytt = i}
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
        if(hvorvier+3 === bytt){
            hold = bilder[bytt]
            old[bytt] = bilder[hvorvier]
            old[hvorvier] = hold
        }
        if(hvorvier-3 === bytt){
            hold = bilder[bytt]
            old[bytt] = bilder[hvorvier]
            old[hvorvier] = hold
        }
        //todo add victory screen?
        setBilder(old)
    }


    return(
            <div class="tullball">
                {bilder.map((x) => (
                    <img alt ='x1' src = {x[0]} onClick={() => handleClick(x[1])}/>
                ))}
            </div>
    );
}
export default Split;