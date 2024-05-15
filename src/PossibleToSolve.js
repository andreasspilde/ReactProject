export default function PossibleToSolve(outArray) {
    let sum = 0
    for(let i = 0; i < outArray.length; i++){
        console.log(outArray[i][1]+ ' vi ser på')
        if(outArray[i][1] === 15){
            if(outArray[i][1] > 3){
                sum += 1;
            }
            if(i > 5){
                sum += 1;
            }
            if(i > 7){
                sum += 1;
            }
            if(i > 11){
                sum += 1;
            }
            console.log(sum + ' summen nå')
        }
        else{
            for(let j = i + 1; j < outArray.length; j++){
                if(outArray[j][1] < outArray[i][1] && outArray[j][1] !== 15){
                    sum += 1; 
                    console.log(outArray[j][1])
                }
            }
            console.log(sum + ' er summen')
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