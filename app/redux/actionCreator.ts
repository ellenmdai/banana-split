import { ActionCreator } from 'redux';
//Import the sample data
import Data from '../instructions.json';
import * as ActionTypes from './actionTypes';
 
export function getData(){
    return (dispatch: any) => {
 
        //Make API Call
        //For this example, I will be using the sample data in the json file
        //delay the retrieval [Sample reasons only]
        setTimeout(() => {
            const data  = Data.instructions;
            dispatch({type: ActionTypes.DATA_AVAILABLE, data:data});
        }, 2000);
 
    };
}