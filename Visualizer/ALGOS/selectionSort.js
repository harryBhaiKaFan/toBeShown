function min(array,from = 0,to = array.length)
{
    let minIdx=from;

    for(let i = from + 1 ; i < to ; i++){
        if(array[i] < array[minIdx]){
            minIdx = i;
        }
    }
    return i;
}

function max(array,from = 0,to = array.length)
{
    let maxIdx=from;

    for(let i = from + 1 ; i < to ; i++){
        if(array[i] > array[maxIdx]){
            maxIdx = i;
        }
    }
    return i;
}

export function selectionSort(array,asc = true) {
    for(let i = 0 ; i < array.length - 1; i++)
    {
        let elemIdx = asc?min(array,i):max(array,i);
        const temp = array[i];
        array[i] = array[elemIdx];
        array[elemIdx] = temp;
    }
}