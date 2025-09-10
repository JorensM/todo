import { FlatList } from 'react-native';
import EditableText from './EditableText';
import { TodoItem } from '@/types/TodoItem';

type TodoListItemProps = {
    onClick: () => void,
    data: TodoItem
}

const TodoListItem = (props: TodoListItemProps) => {
    // key = id
    return <EditableText text={props.data.name} />
}

type TodoListProps = {
    onItemClick: (itemID: number) => void
    items: TodoItem[]
}

export default function TodoList( props: TodoListProps ) {
    console.log(props.items);
    return <FlatList
        data={props.items}
        renderItem={(info) => <TodoListItem data={info.item} onClick={() => props.onItemClick(info.item.id)}/>}
    />
}