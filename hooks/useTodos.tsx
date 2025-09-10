import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { TodoItem } from '@/types/TodoItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TodosContext = createContext<{
    todos: TodoItem[],
    setTodos: (newTodos: TodoItem[] | ((prevTodos: TodoItem[]) => TodoItem[])) => void
}>();

const storageKey = 'todo-app:todos';

const todoStorage = {
    getAll: async () => {
        const str = await AsyncStorage.getItem(storageKey);
        const items = ( str === '{}' || !str ) ? [] : JSON.parse(str);
        return items;
    },
    setAll: async (items: TodoItem[]) => {
        // if(Platform.OS === 'web' && window === undefined) return;
        const str = JSON.stringify(items);
        await AsyncStorage.setItem(storageKey, str);
    }
}

export const TodosProvider = ( props: PropsWithChildren ) => {

    const [todos, setTodos] = useState([]);

    const init = async () => {
        const initialTodos = await todoStorage.getAll();
        setTodos(initialTodos);
    }

    useEffect(() => {
        init();
    }, []);

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


    const onTodosChange = (newTodos: TodoItem[]) => {
        todoStorage.setAll(newTodos);
    }

    const addTodo = () => {
        context.setTodos((todos) => {
            const newTodos = [...todos, genDefaultTodo(todos)];
            onTodosChange(newTodos);
            return newTodos;
        });
    }

    const removeTodoByID = (id: number) => {
        context.setTodos((todos) => {
            const newTodos = todos.filter(item => item.id !== id);
            onTodosChange(newTodos);
            return newTodos;
        });
    }

    const updateTodo = (todo: TodoItem) => {
        context.setTodos((todos) => {
            const newTodos = [...todos];
            const index = newTodos.findIndex((item) => item.id === todo.id);
            if(index === -1) {
                return todos;
            }
            newTodos[index] = todo;
            onTodosChange(newTodos);
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