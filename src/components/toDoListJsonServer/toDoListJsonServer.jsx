import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Todo } from "../todo/todo";
import { ControlPanel } from "../controlPanel/controlPanel";
import {
    selectIsAlphabetSorting,
    selectSearchPhrase,
    selectTodos,
} from "../../selectors";
import { readTodosAsync } from "../../actions";
import styles from "../toDoList.module.css";

// Старт json-server --watch src/db.json --port 3003

export const ToDoListJsonServer = () => {
    const todos = useSelector(selectTodos);
    const searchPhrase = useSelector(selectSearchPhrase);
    const isAlphabetSorting = useSelector(selectIsAlphabetSorting);
    const dispatch = useDispatch();

    // Получение списка todos
    useEffect(() => {
        dispatch(readTodosAsync(searchPhrase, isAlphabetSorting));
    }, [searchPhrase, isAlphabetSorting]);
    // При изменении в массиве зависимостей (searchPhrase, isAlphabetSorting)
    // будет срабатывать хук useEffect() и будут заново считываться и выводится
    // данные с сервера.

    return (
        <>
            <h2>Список дел</h2>
            <div className={styles.app}>
                <ControlPanel />
                <div>
                    {todos.map(({ id, title, completed }) => (
                        <Todo
                            key={id}
                            id={id}
                            title={title}
                            completed={completed}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};
