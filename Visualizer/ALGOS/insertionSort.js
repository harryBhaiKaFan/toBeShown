function insertValInArr(array,idx,val)
{
    let newLen = array.length + 1;

    while(newLen)
    {
        if (newLen-1 == idx)
        {
            array[idx] = val;
            break;
        }
        array[newLen-1] = array[newLen-2];
        newLen--;
    }
}

export function insertionSort(array, asc=true)
{
    let new_array = [];

    for(let i = 0; i < array.length; i++)
    {
        let insertIdx = 0;
        for(let j = 0; j < new_array.length; j++)
        {
            if (asc && new_array[j] > array[i])
            {
                insertIdx = j;
            }else if(new_array[j] < array[i])
            {
                insertIdx = j;
            }
        }
        
        insertValInArr(new_array,insertIdx,array[i]);
    }

    return new_array;

}