// Core
import { Header } from '@react-navigation/elements';
import Octicons from '@expo/vector-icons/Octicons';
import styled from 'styled-components/native';

// Components
import FAB from '@/components/FAB';
import TodoList from '@/components/TodoList';

// Hooks
import useTodos from '@/hooks/useTodos';
import Search from '@/components/Search';
import { useMemo, useState } from 'react';

const Main = styled.View`
  height: 100%;
`

const Content = styled.View`
  padding: 16px;
  flex: 1;
`

export default function HomeScreen() {

  const todos = useTodos();

  const [searchValue, setSearchValue] = useState<string>("");

  const filteredItems = useMemo(() => {
    console.log(searchValue);
    return todos.items.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()));
  }, [searchValue, todos.items]);

  return (
    // <SafeAreaView>
    <Main>
        <Header
          title='Todo List'
          headerStyle={{height: 64, gap: 4}}
          headerRightContainerStyle={{justifyContent: 'flex-start'}}
          headerRight={() => 
            <Search
              onChangeText={setSearchValue}
            />
          }
        >
        </Header>
        <Content>
          <TodoList
            items={filteredItems}
            onItemChange={todos.updateTodo}
            onItemDelete={todos.removeTodoByID}
          />
        </Content>
        <FAB onPress={() => todos.addTodo()}><Octicons name='plus' size={24} /></FAB>
    </Main>
    // </SafeAreaView>
  );
}
