// Переработать приложение "Список Дел", сделанное в задании седьмого урока
// "Context API":
// не использовать React Context и хук useReducer();
// использовать "redux", "react-redux" и "redux-thunk";
// определить части состояния и разделить на подсостояния;
// разделить редьюсер на несколько подредьюсеров;
// проверить работу приложения в Redux DevTools.

import { ToDoListJsonServer } from "../components/toDoListJsonServer/toDoListJsonServer";

export const App = () => {
    return (
        <div>
            <ToDoListJsonServer />
        </div>
    );
};
