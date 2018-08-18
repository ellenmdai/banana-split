import { combineReducers } from 'redux';
 
import { DATA_AVAILABLE } from "./actionTypes" //Import the actions types constant we defined in our actions
 
interface AppState {
    data: any;
    loading: boolean;
}

let dataState: AppState = { data: [], loading:true };
 
export const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case DATA_AVAILABLE:
            state = Object.assign({}, state, { data: action.data, loading:false });
            return state;
        default:
            return state;
    }
};
 
// Combine all the reducers
export const rootReducer = combineReducers({
    dataReducer
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
})
 
export default rootReducer;