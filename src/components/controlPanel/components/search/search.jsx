import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "./utils";
import { selectSearchInput } from "../../../../selectors";
import { ACTION_TYPE } from "../../../../actions";
import styles from "../../../toDoList.module.css";

export const Search = () => {
    const searchInput = useSelector(selectSearchInput);
    const dispatch = useDispatch();

    const runSearch = (phrase) => {
        dispatch({ type: ACTION_TYPE.SET_SEARCH_PHRASE, payload: phrase });
    };

    const debounсedRunSearch = useRef(debounce(runSearch, 1500)).current;
    // использование хука useRef() для предотвращения перерендеривания функции debounсedRunSearch()

    // Реализация поиска с помощью debounce() с задержкой и без нажатия на кнопку
    const onChange = ({ target }) => {
        dispatch({ type: ACTION_TYPE.SET_SEARCH_INPUT, payload: target.value });

        debounсedRunSearch(target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        runSearch(searchInput);
    }; // поиск активируется по нажатию Enter

    return (
        <form
            className={styles.search}
            onSubmit={onSubmit}
        >
            <input
                className={styles.inputField}
                type="text"
                placeholder="Поиск..."
                value={searchInput}
                onChange={onChange}
            />
        </form>
    );
};
