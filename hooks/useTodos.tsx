import { Children, createContext, PropsWithChildren, useContext, useState } from 'react';
import { TodoItem } from '@/types/TodoItem';

const TodosContext = createContext<{
    todos: TodoItem[],
    setTodos: (newTodos: TodoItem[]) => void
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

const getMaxID = (items: { id: number }) => {
    if(!items.length) {
        return 0;
    }
    return Math.max(items.map(item => item.id)) + 1;
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
        context.setTodos((todos) => [...todos, genDefaultTodo(context.todos)]);
    }

    return {
        addTodo,
        items: context.todos
    }
}

// export { TodosContext };