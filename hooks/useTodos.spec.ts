import { renderHook, act } from '@testing-library/react-native';
import useTodos, { TodosProvider } from './useTodos';

const renderTodosHook = () => renderHook(() => useTodos(), { wrapper: TodosProvider });

describe('useTodos()', () => {
    it('Should allow you to add a todo', () => {
        const todos = renderTodosHook();

        act(() => {
            todos.result.current.addTodo();
    
            todos.result.current.addTodo();
        })


        expect(todos.result.current.items.length).toEqual(2);
    })

    it('Should allow you to remove a todo', () => {
        const todos = renderTodosHook();
    })
})