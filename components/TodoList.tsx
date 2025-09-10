import { FlatList, TouchableOpacity, View } from 'react-native';
import EditableText from './EditableText';
import Checkbox from 'expo-checkbox';
import { TodoItem } from '@/types/TodoItem';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type TodoListItemProps = {
    onChange: (newItem: TodoItem) => void,
    onDelete: () => void,
    data: TodoItem,
    autoUpdateText?: boolean
}

export const TodoListItem = (props: TodoListItemProps) => {
    // key = id

    const onChange = (data) => {
        if(props.onChange) {
            props.onChange(data)
        }
    }

    return (<View key={props.data.id}>
        <Checkbox 
            value={props.data.completed}
            onValueChange={(completed) => onChange({...props.data, completed})}
        />
        <EditableText 
            text={props.data.name} 
            autoUpdateText={props.autoUpdateText} 
            onChange={(name) => onChange({...props.data, name})}
        />
        <TouchableOpacity
            onPress={props.onDelete}
            testID='delete'
        >
            <MaterialIcons name='highlight-remove' color='red' size={24} />
        </TouchableOpacity>
    </View>
    )
}

type TodoListProps = {
    onItemChange: (newItem: TodoItem) => void
    items: TodoItem[]
}

export default function TodoList( props: TodoListProps ) {
    console.log(props.items);
    return <FlatList
        data={props.items}
        renderItem={(info) => <TodoListItem data={info.item} onChange={props.onItemChange} autoUpdateText={true}/>}
    />
}