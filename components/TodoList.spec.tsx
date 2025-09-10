import { render, screen, userEvent } from '@testing-library/react-native';
import { TodoListItem } from './TodoList';

describe('<TodoListItem>', () => {
    it('Should display the name of the task', () => {
        render(<TodoListItem data={{id: 0, name: 'Name of the task', completed: false}}/>);

        expect(screen.getByText('Name of the task')).toBeVisible();
    })

    it('Should display a checkbox reflecting the data of the task', async () => {


        render(<TodoListItem data={{id: 0, name: 'Task', completed: true}}/>);

        expect(screen.getByRole('checkbox')).toBeChecked();

        render(<TodoListItem data={{id: 0, name: 'Task', completed: false}}/>);

        expect(screen.getByRole('checkbox')).not.toBeChecked();


        const onChangeCb = jest.fn();

        render(<TodoListItem data={{id: 0, name: 'Task', completed: false}} onChange={onChangeCb}/>);

        const user = userEvent.setup();

        await user.press(screen.getByRole('checkbox'));

        expect(onChangeCb).toHaveBeenCalledWith({id: 0, name: 'Task', completed: true});
    })

    it('Should have an editable task name', async () => {

        const onChangeCb = jest.fn();

        render(<TodoListItem data={{id: 0, name: 'Task', completed: false}} autoUpdateText={true} onChange={onChangeCb}/>);

        const user = userEvent.setup();

        expect(screen.queryByTestId('edit')).not.toBeVisible();

        await user.press(screen.getByText('Task'));

        const inputAsync = screen.findByTestId('edit');
        const input = screen.getByTestId('edit');

        expect(await inputAsync).toBeVisible();

        expect(input).toHaveDisplayValue('Task');

        expect(input).toBeVisible();

        await user.type(input, ' edited');

        expect(screen.queryByTestId('edit')).not.toBeVisible();
        expect(await screen.findByText('Task edited')).toBeVisible();

        expect(onChangeCb).toHaveBeenCalledWith({id: 0, name: 'Task edited', completed: false});

    })

    it('Should have a delete button', async () => {

        const onDeleteCb = jest.fn();

        render(<TodoListItem data={{id: 0, name: 'Task', }} onDelete={onDeleteCb} />);

        const user = userEvent.setup();

        await user.press(screen.getByTestId('delete'));

        expect(onDeleteCb).toHaveBeenCalledTimes(1);
    })
})