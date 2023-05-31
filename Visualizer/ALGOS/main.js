import { bubbleSort } from "./bubbleSort";
import { selectionSort } from "./selectionSort";
import { insertionSort } from "./insertionSort";


function BubbleSortVis(root)
{

}

export const ALGOS = {
    init: function(algo,root){
        switch (algo)
        {
            case "bubbleSort":
                BubbleSortVis(root);
                break;
            default:
        }
    }
};