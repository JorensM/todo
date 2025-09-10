import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import EditableText from './EditableText';
import Checkbox from 'expo-checkbox';
import { TodoItem } from '@/types/TodoItem';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import styled from 'styled-components/native';

type TodoListItemProps = {
    onChange: (newItem: TodoItem) => void,
    onDelete: () => void,
    data: TodoItem,
    autoUpdateText?: boolean
}

const TodoListItemContainer = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    gap: 8px;
`;

const RemoveButton = styled.TouchableOpacity`
    margin-left: auto;
`;

export const TodoListItem = (props: TodoListItemProps) => {
    // key = id

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

type TodoListProps = {
    onItemChange: (newItem: TodoItem) => void
    items: TodoItem[]
}

const ListSeparator = styled.View`
    height: 16px;
`

export default function TodoList( props: TodoListProps ) {
    return (
        <ScrollView>
            <FlatList
                ItemSeparatorComponent={() => <ListSeparator/>}
                data={props.items}
                renderItem={(info) => <TodoListItem data={info.item} onChange={props.onItemChange}/>}
            />
        </ScrollView>

    )
    
}