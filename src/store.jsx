import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { thunk } from "redux-thunk";
import { todosReducer, editingTodoReducer, optionsReducer } from "./reducers";

const reducer = combineReducers({
    todos: todosReducer,
    editingTodo: editingTodoReducer,
    options: optionsReducer,
}); // подстейты для редьюсеров

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

export const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk)),
);
