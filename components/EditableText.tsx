import { useEffect, useRef, useState } from 'react';
import { Text, TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

type EditableTextProps = {
    text: string,
    onChange: (newText: string) => void
}

const TextPlain = styled.Text`
    color: white;
    font-size: 24px;
`;

const TextEditing = styled.TextInput`
    background-color: lightgray;
    font-size: 24px;
    padding: 4px;
`

// A text component that can be edited when tapped/clicked
export default function EditableText( props: EditableTextProps ) {

    
    /**
     * Whether the component is in edit mode or not
     */
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const textEditingRef = useRef<TextInput>();

    /**
     * The text value as seen in the edit field
     */
    const [localText, setLocalText] = useState<string>(props.text);

    const handleTextPlainPress = () => {
        setIsEditing(true);
    }

    useEffect(() => {
        if(isEditing) {
            textEditingRef.current.focus();
        }
    }, [isEditing])

    return isEditing ? 
        <TextEditing
            value={localText} 
            onChangeText={setLocalText}
            onBlur={() => setIsEditing(false)}
            ref={textEditingRef}
            autoFocus={true}
        /> : (
        <TouchableOpacity
            onPress={() => setIsEditing(true)}
        >
            <TextPlain>
                {props.text}
            </TextPlain>
        </TouchableOpacity>
    )

}