export default function PossibleToSolve(outArray) {
    let sum = 0
    for(let i = 0; i < outArray.length; i++){
        if(outArray[i][1] === 15){
            if(i > 11){
                sum += 3;
            }
            else if(i > 7){
                sum += 2;
            }
            else if(i > 3){
                sum += 1;
            }
        }
        else{
            for(let j = i + 1; j < outArray.length; j++){
                if(outArray[j][1] < outArray[i][1] && outArray[j][1] !== 15){
                    sum += 1; 
                    console.log(outArray[j][1])
                }
            }
        }
    }
    if((sum % 2) === 1){
        console.log(true)
        console.log(sum)
        return(true);
    }
    else{
        console.log(false)
        console.log(sum)
        return(false);
    }
}