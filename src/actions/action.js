export const FETCH_INVENTORY_REQUEST = "FETCH_INVENTORY_REQUEST";
export const FETCH_INVENTORY_SUCCESS = "FETCH_INVENTORY_SUCCESS";
export const FETCH_INVENTORY_FAILURE = "FETCH_INVENTORY_FAILURE";

export const fetchInventoryRequest = () => ({ type: FETCH_INVENTORY_REQUEST });
export const fetchInventorySuccess = (inventory) => ({ type: FETCH_INVENTORY_SUCCESS, payload : inventory });
export const fetchInventoryFailure = (error) => ({ type: FETCH_INVENTORY_FAILURE, payload: error });

export const initialState = {
    inventory: [],
    loading: false,
    error : null
}