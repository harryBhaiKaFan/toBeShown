function min(array)
{
    let minVal = array[0];

    array.forEach(val => {
        if(val < minVal)
        {
            minVal = val;
        }
    });

    return (minVal);
}

function max(array)
{
    let maxVal = array[0];

    array.forEach(val => {
        if(val > maxVal)
        {
            maxVal = val;
        }
    });

    return (maxVal);
}


export function countingSort(array)
{
    if (min(array) < 0)
    {
        console.error("Cannot sort negative values!");
        return;
    }

    let range = [];
    let rangeLen = max(array) + 1;
    for(let i = 0; i < rangeLen; i++)
    {
        range[i] = 0;
    }
    
    let new_array = Array(array.length);

    for(let j = 0; j < array.length; j++)
    {
        range[array[j]] = range[array[j]] + 1;
    }

    for(let j = 1; j < range.length; j++)
    {
        range[j] = range[j-1] + range[j];
    }

    for(let j = array.length - 1; j >= 0; j++)
    {
        new_array[range[array[j]]-1] = array[j];
        range[array[j]] = range[array[j]] - 1;
    }

    return new_array;
}