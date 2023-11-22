import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { register, login, allUser, posts, allPosts ,profileUser} from './redux/reducer'

const reducer = combineReducers({
    register:register,
    login:login,
    users:allUser,
    post:posts,
    allPosts:allPosts,
    profileUser:profileUser,
})
const middelWare = [thunk]

// function savetoLocalStorage(state) {
//    try{
//     const saveData = JSON.stringify(state);
//     localStorage.setItem('login',saveData)
//    }catch(e){
//     return e.message
//    }
// }

// function getFromLocalStorage(){
//   try{
//     const saveData = localStorage.getItem('login') 
//     if(saveData == null) return undefined;
//     return  JSON.parse(saveData);
//   }catch(e){
//     return e.message && undefined
//   }
// }



const store = createStore(
    reducer,
    // getFromLocalStorage(),
    composeWithDevTools(applyMiddleware (...middelWare))
    )

// store.subscribe(() =>savetoLocalStorage(store.getState()))

export default store;