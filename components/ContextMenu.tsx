import { PropsWithChildren } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';



const MenuContainer = styled.View`
    background-color: lightgray;
    width: 100px;
    height: 100px;
`

const MenuOverlay = styled.TouchableOpacity`
    width: 100vw;
    height: 100vh;
    background-color: gray;
    position: absolute;
`

type ContextMenuProps = {
    isOpen: boolean,
    onClose: () => void
}

function ContextMenu( props: PropsWithChildren<ContextMenuProps> ) {

    return props.isOpen ? (
        <MenuOverlay
            // onOutsidePress={() => context.setIsOpen(false)}
            onPress={props.onClose}
        >
            <View
                
            >

            </View>
        </MenuOverlay>
    ) : null;
}

export default ContextMenu;