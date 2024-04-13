import { initialState } from "../actions/action";
import { FETCH_INVENTORY_FAILURE, FETCH_INVENTORY_SUCCESS, FETCH_INVENTORY_REQUEST } from "../actions/action";

export const inventoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_INVENTORY_REQUEST:
            return {
                ...state,
                loading: true,
                error : null
            }
        case FETCH_INVENTORY_SUCCESS:
            return {
                ...state, 
                loading: false,
                inventory : action.payload
            }
        case FETCH_INVENTORY_FAILURE:
            return {
                ...state, 
                loading: false,
                error : action.payload
            }
        default:
            return {
                ...state
            }
    }
}