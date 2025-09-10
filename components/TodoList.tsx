// Core
import { FlatList } from 'react-native';
import Checkbox from 'expo-checkbox';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import styled from 'styled-components/native';

// Components
import EditableText from './EditableText';

// Types
import { TodoItem } from '@/types/TodoItem';

// Todo list and todo list item components



const TodoListItemContainer = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    gap: 8px;
`;

const RemoveButton = styled.TouchableOpacity`
    margin-left: auto;
`;

type TodoListItemProps = {
    onChange: (newItem: TodoItem) => void, // Called when todo item has been updated
    onDelete: () => void, // Called when a todo list item delete button has been pressed
    data: TodoItem, // Item data
    autoUpdateText?: boolean // Whether to auto update the text after editing (more info at EditableText.tsx)
}

/**
 * Todo list item component.
 * 
 * Used in conjuction with <TodoList/> to render a todo list
 */
export const TodoListItem = (props: TodoListItemProps) => {

    /**
     * onChange wrapper, called when the todo item has been edited
     */
    const onChange = (data) => {
        if(props.onChange) {
            props.onChange(data)
        }
    }

    return (<TodoListItemContainer key={props.data.id}>
        <Checkbox 
            value={props.data.completed}
            onValueChange={(completed) => onChange({...props.data, completed})}
        />
        <EditableText 
            text={props.data.name} 
            autoUpdateText={props.autoUpdateText} 
            onChange={(name) => onChange({...props.data, name})}
        />
        <RemoveButton
            onPress={props.onDelete}
            testID='delete'
        >
            <MaterialIcons name='highlight-remove' color='red' size={24} />
        </RemoveButton>
    </TodoListItemContainer>
    )
}


const ListSeparator = styled.View`
    height: 16px;
`

type TodoListProps = {
    onItemChange: (newItem: TodoItem) => void, // Called when a single item has been updated
    onItemDelete: (id: number) => void, // Called when an item is requesting deletion
    items: TodoItem[] // Items to display
}

/**
 * Todo list component. Renders a list of <TodoListItem/> components
 * @param props 
 * @returns 
 */
export default function TodoList( props: TodoListProps ) {
    return (
        <FlatList
            style={{height: 'calc(100vh - 64px)'}}
            ItemSeparatorComponent={() => <ListSeparator/>}
            data={props.items}
            renderItem={(info) => <TodoListItem data={info.item} onChange={props.onItemChange} onDelete={() => props.onItemDelete(info.item.id)}/>}
        />
    )
    
}