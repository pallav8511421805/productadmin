import { applyMiddleware, createStore } from "redux"
import { Rootreducer } from "./reducer";
import thunk from 'redux-thunk';

export const configstore = () =>{
    let store = createStore(Rootreducer,applyMiddleware(thunk))
    return store;
}