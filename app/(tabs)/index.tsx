// Core
import { Header } from '@react-navigation/elements';
import Octicons from '@expo/vector-icons/Octicons';
import styled from 'styled-components/native';
import { Modal, TouchableOpacity, NativeSyntheticEvent, TouchableWithoutFeedback } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useMemo, useState } from 'react';

// Components
import FAB from '@/components/FAB';
import TodoList from '@/components/TodoList';
import Search from '@/components/Search';

// Hooks
import useTodos from '@/hooks/useTodos';
import ExclusiveCheckbox from '@/components/ExclusiveCheckbox';

const Main = styled.View`
  height: 100%;
`

const Content = styled.View`
  padding: 16px;
  flex: 1;
`

const HeaderRightContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding-inline: 8px;
  gap: 8px;
`

const ModalOverlay = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: default;
  align-items: center;
  justify-content: center;
`

const ModalMenu = styled.View`
  background-color: lightgray;
  border-radius: 8px;
  max-width: 80%;
  padding: 16px;
  cursor: auto;
  gap: 8px;
`

const ModalTitle = styled.Text`
  font-size: 20px;
`
// Main page
export default function HomeScreen() {

  // Hooks
  const todos = useTodos();

  // Filters and search
  const [searchValue, setSearchValue] = useState<string>("");
  const [filterValue, setFilterValue] = useState<'all' | 'completed' | 'incompleted'>('all');

  // Filter items by search and selected filters
  const filteredItems = useMemo(() => {
    let filteredItems = todos.items.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()));
    if(filterValue !== 'all') {
      filteredItems = filteredItems.filter(item => filterValue === 'completed' ? item.completed : !item.completed);
    }
    return filteredItems;
  }, [searchValue, todos.items, filterValue]);

  // Whether to show the filters menu
  const [showFilterMenu, setShowFilterMenu] = useState<boolean>(false);

  /**
   * Called when a filter gets selected
   */
  const handleFilterChange = (id: string) => (checked: boolean) => {
    if(checked) {
      setFilterValue(id);
    } else {
      setFilterValue('all');
    }
  }

  return (
    <Main>
        <Modal
          visible={showFilterMenu}
          transparent={true}
          onDismiss={() => setShowFilterMenu(false)}
          style={{
            cursor: 'default'
          }}
        >
          <ModalOverlay
            onPress={(e: NativeSyntheticEvent<TouchEvent>) => {
              setShowFilterMenu(false)
            }}
          >
            <TouchableWithoutFeedback>
              <ModalMenu
              >
                <ModalTitle>Filter</ModalTitle>
                <ExclusiveCheckbox.List>
                  <ExclusiveCheckbox
                    id='all'
                    label="All"
                    exclude={['completed', 'incompleted']}
                    value={filterValue === 'all'}
                    onChange={handleFilterChange('all')}
                  />
                  <ExclusiveCheckbox 
                    id='completed'
                    label="Completed"
                    exclude={['all', 'incompleted']}
                    value={filterValue === 'completed'}
                    onChange={handleFilterChange('completed')}
                  />
                  <ExclusiveCheckbox 
                    id='incompleted'
                    label="Incompleted"
                    exclude={['completed', 'all']}
                    value={filterValue === 'incompleted'}
                    onChange={handleFilterChange('incompleted')}
                  />
                </ExclusiveCheckbox.List>
              </ModalMenu>
            </TouchableWithoutFeedback>
          </ModalOverlay>
        </Modal>
        <Header
          title='Todo List'
          headerStyle={{height: 64, gap: 4}}
          headerRightContainerStyle={{justifyContent: 'flex-start'}}
          headerRight={() => 
            <HeaderRightContainer>
              <Search
                onChangeText={setSearchValue}
              />
              <TouchableOpacity
                onPress={() => setShowFilterMenu(true)}
              >
                <MaterialIcons name='filter-list' size={24} color='lightgray' />
              </TouchableOpacity>
            </HeaderRightContainer>
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
  );
}
