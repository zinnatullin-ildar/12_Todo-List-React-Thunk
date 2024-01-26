import { ACTION_TYPE } from "../actions";

const todosInitialState = []; // данные берем из initialState

export const todosReducer = (state = todosInitialState, { type, payload }) => {
    switch (type) {
        case ACTION_TYPE.SET_TODOS:
            return payload; // верно для массива, для объекта будет {...state, ...payload}
        case ACTION_TYPE.ADD_TODO:
            return [payload, ...state];
        case ACTION_TYPE.REMOVE_TODO:
            return state.filter(({ id }) => id !== payload); // здесь payload это id для удаления
        case ACTION_TYPE.UPDATE_TODO:
            return state.map((todo) =>
                todo.id === payload.id ? { ...todo, ...payload } : todo,
            );
        default:
            return state;
    }
}; // деструктурируем action и достаем из него type и payload
