export function bubbleSort(array) 
{
    for (let i = 0; i < array.length - 1; i++) {
        for (let u = 0; u < array.length-1-i ; u++) {
            if(array[u+1] < array[u])
            {
                const elem = array[u];
                array[u] = array[u+1];
                array[u+1] = elem;
            }
        }
    }
}