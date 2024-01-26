import { ACTION_TYPE } from "../actions";

const editingTodoInitialState = {
    id: null,
    title: "",
}; // данные берем из initialState

export const editingTodoReducer = (
    state = editingTodoInitialState,
    { type, payload },
) => {
    switch (type) {
        case ACTION_TYPE.EDIT_TODO:
            return { ...state, ...payload };
        default:
            return state;
    }
}; // деструктурируем action и достаем из него type и payload
