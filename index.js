
const redux = require("redux")
const createStore = redux.createStore
const reduxlogger =require('redux-logger')
const buy_cake = 'buy_cake'// type of the Action
const buy_ice = 'buy_ice'
const logger = reduxlogger.createLogger()
const applymiddlware = redux.applyMiddleware
//Action// its means its contains the types Properties
// {
//     type: buy_cake
    
// } 
//action creator is a function that return function
function buycake() {
    return {
           
        type: buy_cake,
        info:"first redux action"

      }
}

function buyice() {
    return {
           
        type: buy_ice,
        info:"second redux action"

      }
}

// {previousstate,action}=> newstate
// state representrs by single objects 
const initialstate = {
    numofcakes: 10,
    numofice:20
}
   
// reducer function 
// its accepts the state and action as arguments and return the next state state of the applications
const reducer = (state = initialstate, action) => {
    switch (action.type) {
        case buy_cake: return {
            ...state, 
            numofcakes:state.numofcakes-1
        }

         case buy_ice: return {
            ...state, 
            numofice:state.numofice-1
        }
        default:return state
    }
}
const store = createStore(reducer,applymiddlware(logger))
console.log("initial state", store.getState())
// const unsubscribe =store.subscribe(() => console.log('updated state', store.getState()))
const unsubscribe =store.subscribe(()=>{})
store.dispatch(buycake())
store.dispatch(buycake())
store.dispatch(buycake())
store.dispatch(buycake())

store.dispatch(buyice())
store.dispatch(buyice())



unsubscribe()
//We can Combine multiple reducers using combine Reducer ,that will
//accepts objects
//middlware= to extend redux with custom functionality
// Async action in redux

// example of fetching of data
// three step in async operations
//1) state = {
//     loading: true,
//     data: [],
//     error: " "
// }
// loading - display a loading spinner in your components
// data -  list of users
// error - display the error to the users


// Actions
// fetch_users_request- fetched list of users
// fetch_users_success - fetched successfully
// fetch_users_failure - Error fetching the data

//  case: fetch_users_request
// loading: true
//    case: fetch_users_success
// loading: false
// users: data(from api)
//    case: fetch_users_failure
// loading: false
// error: error(from api)
       
