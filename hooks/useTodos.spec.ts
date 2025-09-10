import { renderHook, act } from '@testing-library/react-native';
import useTodos, { getMaxID, TodosProvider } from './useTodos';

const renderTodosHook = () => renderHook(() => useTodos(), { wrapper: TodosProvider });

describe('getMaxID()', () => {
    it('Should return max ID + 1 between given items', () => {
        const maxID = getMaxID([{id: 0}, {id: 4}]);

        expect(maxID).toEqual(5);
    });

    it('Or should return 0 if items array is empty', () => {
        expect(getMaxID([])).toEqual(0);
    })
})

describe('useTodos()', () => {
    it('Should allow you to add a todo', () => {
        const todos = renderTodosHook();

        act(() => {
            todos.result.current.addTodo();
    
            todos.result.current.addTodo();
        })


        expect(todos.result.current.items.length).toEqual(2);
    })

    it('Should allow you to remove a todo by ID', () => {
        const todos = renderTodosHook();

        act(() => {

            todos.result.current.addTodo();

            todos.result.current.addTodo();
        })

        act(() => {
            console.log(todos.result.current.items);

            todos.result.current.removeTodoByID(0);
        })

        expect(todos.result.current.items.length).toEqual(1);

        expect(todos.result.current.items[0].id).toEqual(1);
    })
})