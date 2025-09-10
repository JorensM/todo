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
    text: string, // Text to display
    onChange: (newText: string) => void, // Called after text has been edited
    autoUpdateText?: boolean // Whether to automatically update the plain text after editing or let the parent handle it
}

/** 
 * A text component that can be edited when tapped/clicked
 */
export default function EditableText( { autoUpdateText = false, ...props }: EditableTextProps ) {

    
    /**
     * Whether the component is in edit mode or not
     */
    const [isEditing, setIsEditing] = useState<boolean>(false);

    /**
     * Text input ref, needed to focus on the input element once edit mode is enabled
     */
    const textEditingRef = useRef<TextInput>();

    /**
     * The text value as seen in the edit field
     */
    const [localText, setLocalText] = useState<string>(props.text);

    /**
     * Called when the text is pressed while not in edit mode
     */
    const handleTextPlainPress = () => {
        // Enable edit mode
        setIsEditing(true);
    }

    /**
     * Called after text is done being edited
     */
    const handleDoneEditing = () => {
        // Disable edit mode
        setIsEditing(false);

        if(props.onChange) {
            // Call onChange with new text
            props.onChange(localText);
        }
    }

    useEffect(() => {
        // Called when editing has started
        if(isEditing) {
            // Focus on the text input element
            textEditingRef.current.focus();
        }
    }, [isEditing]);
    

    return isEditing ? // Display text input when in edit mode 
        <TextEditing
            value={localText} 
            onChangeText={setLocalText}
            onBlur={handleDoneEditing} // Disabled edit mode and sends an onChange event
            ref={textEditingRef}
            autoFocus={true}
            testID='edit'
        /> : ( // Otherwise display plain text
        <TouchableOpacity
            onPress={handleTextPlainPress} // Enables edit mode
        >
            <TextPlain>
                {autoUpdateText ? localText : props.text}
            </TextPlain>
        </TouchableOpacity>
    )
}