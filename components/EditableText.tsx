import { useEffect, useRef, useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const TextPlain = styled.Text`
    color: white;
    font-size: 24px;
`;

const TextEditing = styled.TextInput`
    background-color: lightgray;
    font-size: 24px;
    padding: 4px;
`

type EditableTextProps = {
    text: string,
    onChange: (newText: string) => void,
    autoUpdateText?: boolean
}

// A text component that can be edited when tapped/clicked
export default function EditableText( { autoUpdateText = false, ...props }: EditableTextProps ) {

    
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

    const handleDoneEditing = () => {
        setIsEditing(false);
        if(props.onChange) {
            props.onChange(localText);
        }
    }

    useEffect(() => {
        if(isEditing) {
            textEditingRef.current.focus();
        }
    }, [isEditing]);
    

    return isEditing ? 
        <TextEditing
            value={localText} 
            onChangeText={setLocalText}
            onBlur={handleDoneEditing}
            ref={textEditingRef}
            autoFocus={true}
            testID='edit'
        /> : (
        <TouchableOpacity
            onPress={handleTextPlainPress}
        >
            <TextPlain>
                {autoUpdateText ? localText : props.text}
            </TextPlain>
        </TouchableOpacity>
    )

}