import { applyMiddleware, createStore } from "redux"
import { Rootreduce } from './index';
import thunk from 'redux-thunk';

export const configstore = () =>{
    let store = createStore(Rootreduce,applyMiddleware(thunk))
    return store;
}