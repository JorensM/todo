import { Children, createContext, PropsWithChildren, useContext, useState } from 'react';
import { TodoItem } from '@/types/TodoItem';

const TodosContext = createContext<{
    todos: TodoItem[],
    setTodos: (newTodos: TodoItem[] | ((prevTodos: TodoItem[]) => TodoItem[])) => void
}>();

const todoStorage = {
    get: () => {

    }
}

export const TodosProvider = ( props: PropsWithChildren ) => {

    const [todos, setTodos] = useState([]);

    return (
        <TodosContext value={{todos, setTodos}}>
            {props.children}
        </TodosContext>
    );
}

export const getMaxID = (items: { id: number }) => {
    if(!items.length) {
        return 0;
    }

    const IDs = items.map(item => item.id);
    return Math.max(...IDs) + 1;
}

const genDefaultTodo = (items) => ({
    id: getMaxID(items),
    name: 'New Todo',
    completed: false
})

/**
 * A utility hook for easily managing todos.
 * 
 * Makes sure that todos are synced with local storage
 */
export default function useTodos() {
    const context = useContext(TodosContext);

    const addTodo = () => {
        context.setTodos((todos) => [...todos, genDefaultTodo(todos)]);
    }

    const removeTodoByID = (id: number) => {
        context.setTodos((todos) => todos.filter(item => item.id !== id));
    }

    const updateTodo = (todo: TodoItem) => {
        context.setTodos((todos) => {
            const newTodos = [...todos];
            const index = newTodos.findIndex((item) => item.id === todo.id);
            if(index === -1) {
                return todos;
            }
            newTodos[index] = todo;
            return newTodos;
        })
    }

    return {
        addTodo,
        removeTodoByID,
        updateTodo,
        items: context.todos
    }
}

// export { TodosContext };