import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
    selectEditingTodoId,
    selectEditingTodoTitle,
    selectIsLoading,
} from "../../selectors";
import {
    ACTION_TYPE,
    createTodoAsync,
    updateTodoAsync,
    deleteTodoAsync,
} from "../../actions";
import { KEYBOARD, NEW_TODO_ID } from "../../constants";
import styles from "../toDoList.module.css";

export const Todo = ({ id, title, completed }) => {
    const editingTodoId = useSelector(selectEditingTodoId);
    const editingTodoTitle = useSelector(selectEditingTodoTitle);
    const isLoading = useSelector(selectIsLoading);
    const dispatch = useDispatch();

    const isEditing = id === editingTodoId;

    // Редактирование дела
    const onEdit = () => {
        dispatch({ type: ACTION_TYPE.EDIT_TODO, payload: { id, title } });

        if (id === NEW_TODO_ID) {
            dispatch({ type: ACTION_TYPE.REMOVE_TODO, payload: NEW_TODO_ID });
        }
    };

    // Редактирование заголовка
    const onTitleChange = ({ target }) => {
        dispatch({
            type: ACTION_TYPE.EDIT_TODO,
            payload: { title: target.value },
        });
    };

    // Смена статуса у дела
    const onCompletedChange = ({ target: { checked } }) => {
        dispatch(updateTodoAsync({ id, completed: checked }));
    };

    // Сохранение нового дела
    const onNewTodoSave = () => {
        if (editingTodoTitle.trim() === "") {
            dispatch({ type: ACTION_TYPE.REMOVE_TODO, payload: id });

            return;
        }

        dispatch(createTodoAsync({ title: editingTodoTitle, completed }));
    };

    // Сохранение отредактированного дела
    const onEditingTodoSave = () => {
        if (editingTodoTitle.trim() === "") {
            onRemove();

            return;
        }

        dispatch(updateTodoAsync({ id, title: editingTodoTitle })).then(() => {
            dispatch({
                type: ACTION_TYPE.EDIT_TODO,
                payload: { id: null },
            });
        });
    };

    // Функция сохранения, обобщающая в себя две верхние
    const onSave = () => {
        if (id === NEW_TODO_ID) {
            onNewTodoSave();
        } else {
            onEditingTodoSave();
        }
    };

    // Удаление дела
    const onRemove = () => {
        dispatch(deleteTodoAsync(id));
    };

    // Сохранение дела по Enter или удаление по Escape

    const onTitleKeyDown = ({ key }) => {
        if (key === KEYBOARD.ENTER) {
            onSave();
        } else if (key === KEYBOARD.ESCAPE) {
            dispatch({
                type: ACTION_TYPE.EDIT_TODO,
                payload: { id: null },
            });

            if (id === NEW_TODO_ID) {
                dispatch({ type: ACTION_TYPE.REMOVE_TODO, payload: id });
            }
        }
    };

    return (
        <div className={styles.todo}>
            {/* пометка о выполненном деле */}
            <input
                className={styles.checkbox}
                type="checkbox"
                disabled={isEditing || isLoading} // блокирует поле при редактировании и загрузке
                checked={completed}
                onChange={onCompletedChange}
            />
            <div className={styles.title}>
                {/* редактирование по клику на поле*/}
                {isEditing ? (
                    <input
                        type="text"
                        autoFocus={true} // атрибут включающий автофокус
                        disabled={isLoading} // атрибут блокирует поле при загрузке
                        value={editingTodoTitle}
                        onChange={onTitleChange}
                        onKeyDown={onTitleKeyDown}
                    />
                ) : (
                    <div onClick={onEdit}>{title}</div>
                )}
            </div>
            {/* сохранение или удаление */}
            <div>
                {isEditing ? (
                    <button
                        className={styles.btn}
                        onClick={onSave}
                    >
                        ✔
                    </button>
                ) : (
                    <button
                        className={styles.btn}
                        onClick={onRemove}
                    >
                        ✖
                    </button>
                )}
            </div>
        </div>
    );
};

Todo.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
};
