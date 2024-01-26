import { useDispatch } from "react-redux";
import { Search, Sorting } from "./components";
import { ACTION_TYPE } from "../../actions";
import { NEW_TODO_ID } from "../../constants";
import styles from "../toDoList.module.css";

export const ControlPanel = () => {
    const dispatch = useDispatch();

    // Создание нового дела
    const onTodoAdd = () => {
        dispatch({
            type: ACTION_TYPE.ADD_TODO,
            payload: {
                id: NEW_TODO_ID,
                title: "",
                completed: false,
            },
        });

        dispatch({
            type: ACTION_TYPE.EDIT_TODO,
            payload: {
                id: NEW_TODO_ID,
                title: "",
            },
        });
    };

    return (
        <div className={styles.controlPanel}>
            <Search />
            <Sorting />
            <button
                className={styles.btn}
                onClick={onTodoAdd}
            >
                ✚
            </button>
        </div>
    );
};
