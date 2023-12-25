const redux = require('redux');
const axios = require('axios');
const thunkMiddleware = require('redux-thunk').default;
const createStore  = redux.createStore;
const applyMiddleware = redux.applyMiddleware;


const initialState = {
    loading: false,
    users: [],
    error: ''
};

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

const fetchUsersRequest = () => ({
    type: FETCH_USERS_REQUEST
});

const fetchUsersSuccess = users => ({
    type: FETCH_USERS_SUCCESS,
    payload: users
});

const fetchUsersFailure = error => ({
    type: FETCH_USERS_FAILURE,
    payload: error
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: ''
            };
        case FETCH_USERS_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload
            };
        default:
            return state;
    }
};

const fetchUsers = () => {
    // Using thunk middleware for async action creator
    return function(dispatch) {
        dispatch(fetchUsersRequest());
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                const users = response.data.map(user => user.id);
                dispatch(fetchUsersSuccess(users));
            })
            .catch(error => {
                dispatch(fetchUsersFailure(error.message));
            });
    };
}
 
// Create the store with middleware applied
const store = createStore(reducer , applyMiddleware(thunkMiddleware));

// Subscribing to store changes
store.subscribe(() => {
    console.log(store.getState());
});

// Dispatching the async action
store.dispatch(fetchUsers());



