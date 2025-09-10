import FAB from '@/components/FAB';
import { HeaderTitle, Header } from '@react-navigation/elements';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Octicons from '@expo/vector-icons/Octicons';
import styled from 'styled-components/native';
import TodoList from '@/components/TodoList';
import { TodoItem } from '@/types/TodoItem';
import useTodos, { TodosProvider } from '@/hooks/useTodos';

const Main = styled.View`
  height: 100%;
`

const Content = styled.View`
  padding: 16px;
`

const testData: TodoItem[] = [{
  id: 0,
  name: 'New todo',
  completed: false
}]

export default function HomeScreen() {

  const todos = useTodos();

  return (
    <Main>
        <Header
          title='Todo'
        >
        </Header>
        <Content>
          <TodoList
            items={todos.items}
          />
        </Content>
        <FAB onPress={() => todos.addTodo()}><Octicons name='plus' size={24} /></FAB>
    </Main>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
