// Core
import { Header } from '@react-navigation/elements';
import Octicons from '@expo/vector-icons/Octicons';
import styled from 'styled-components/native';

// Components
import FAB from '@/components/FAB';
import TodoList from '@/components/TodoList';

// Hooks
import useTodos from '@/hooks/useTodos';

const Main = styled.View`
  height: 100%;
`

const Content = styled.View`
  padding: 16px;
  flex: 1;
`


export default function HomeScreen() {

  const todos = useTodos();

  return (
    // <SafeAreaView>
    <Main>
        <Header
          title='Todo List'
          headerStyle={{height: 64}}
        >
        </Header>
        <Content>
          <TodoList
            items={todos.items}
            onItemChange={todos.updateTodo}
            onItemDelete={todos.removeTodoByID}
          />
        </Content>
        <FAB onPress={() => todos.addTodo()}><Octicons name='plus' size={24} /></FAB>
    </Main>
    // </SafeAreaView>
  );
}
