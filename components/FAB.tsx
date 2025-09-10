// Core
import styled from 'styled-components/native';

const Button = styled.TouchableOpacity`
    border-radius: 100px;
    background-color: white;
    width: fit-content;
    padding-block: 20px;
    padding-inline: 24px;
    align-self: flex-start;
    position: absolute;
    right: 16px;
    bottom: 16px;
`;

// Floating action button
const FAB = Button;

export default FAB;