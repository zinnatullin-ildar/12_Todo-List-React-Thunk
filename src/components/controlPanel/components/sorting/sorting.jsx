import { useDispatch, useSelector } from "react-redux";
import { selectIsAlphabetSorting } from "../../../../selectors";
import { ACTION_TYPE } from "../../../../actions";
import styles from "../../../toDoList.module.css";

export const Sorting = () => {
    const isAlphabetSorting = useSelector(selectIsAlphabetSorting);
    const dispatch = useDispatch();

    const onChange = ({ target }) => {
        dispatch({
            type: ACTION_TYPE.SET_IS_ALPHABET_SORTING,
            payload: target.checked,
        });
    };

    return (
        <button className={styles.btn}>
            <input
                className={styles.checkboxSort}
                id="sortingButton"
                type="checkbox"
                checked={isAlphabetSorting}
                onChange={onChange}
            />
            <label
                className={styles.label}
                htmlFor="sortingButton"
            >
                A&darr;
            </label>
        </button>
    );
};
