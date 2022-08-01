import { combineReducers } from "redux";
import { productreducer } from "./reducers/product.reducer";

export const Rootreduce = combineReducers({
product : productreducer
})