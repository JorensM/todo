// Core
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types
import { TodoItem } from '@/types/TodoItem';

// Constants
import defaults from '@/constants/defaults';

/**
 * A hook and utility functions for managing todos
 */

/**
 * Context used to keep track of todos within the app
 */
export const TodosContext = createContext<{
    todos: TodoItem[],
    setTodos: (newTodos: TodoItem[] | ((prevTodos: TodoItem[]) => TodoItem[])) => void
}>();

/**
 * Key used to identify todo items in local storage
 */
const storageKey = 'todo-app:todos';

/**
 * Simple wrapper for local storage to get/set todos
 */
const todoStorage = {
    /**
     * Retrieve all todos from local storage
     */
    getAll: async () => {
        const str = await AsyncStorage.getItem(storageKey);
        const items = ( str === '{}' || !str ) ? [] : JSON.parse(str);
        return items;
    },
    /**
     * Set all todos in local storage
     * @param items 
     */
    setAll: async (items: TodoItem[]) => {
        const str = JSON.stringify(items);
        await AsyncStorage.setItem(storageKey, str);
    }
}

/**
 * Basic wrapper around TodosContext. Initializes state
 */
export const TodosProvider = ( props: PropsWithChildren ) => {

    const [todos, setTodos] = useState([]);

    /**
     * Called on mount.
     * Retrieves todos from local storage
     */
    const init = async () => {
        const initialTodos = await todoStorage.getAll();
        setTodos(initialTodos.length ? initialTodos : defaults.defaultTodos);
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

/**
 * Get a non-clashing ID
 */
export const getMaxID = (items: { id: number }) => {
    if(!items.length) {
        return 0;
    }
    const IDs = items.map(item => item.id);
    return Math.max(...IDs) + 1;
}

/**
 * Generate a default todo item object
 */
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

    /**
     * Called when the todos state changes.
     * Updates todos in local storage
     */
    const onTodosChange = (newTodos: TodoItem[]) => {
        todoStorage.setAll(newTodos);
    }

    /**
     * Add a new todo
     */
    const addTodo = () => {
        context.setTodos((todos) => {
            const newTodos = [...todos, genDefaultTodo(todos)];
            onTodosChange(newTodos);
            return newTodos;
        });
    }

    /**
     * Remove a todo by ID
     */
    const removeTodoByID = (id: number) => {
        context.setTodos((todos) => {
            const newTodos = todos.filter(item => item.id !== id);
            onTodosChange(newTodos);
            return newTodos;
        });
    }

    /**
     * Update a todo
     */
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