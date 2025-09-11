// Core
import Checkbox from 'expo-checkbox';
import { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native';

const ExclusiveCheckboxContext = createContext();


const CheckboxContainer = styled.View`
    flex-direction: row;
    gap: 4px;
    align-items: center;
`;

const CheckboxLabel = styled.Text`
    font-size: 18px;
`;

type ExclusiveCheckboxProps = {
    id?: string, // ID of checkbox
    exclude?: string, // IDs of checkboxes to disable when this one is checked
    onChange?: (checked: boolean) => void,
    label?: string, // Label to render alongside checkbox
    value?: boolean
}

/**
 * A checkbox component that allows you to create 'exclusive' checkboxes
 * that automatically disable themselves when another, incompatible ExclusiveCheckbox
 * gets checked
 */
function ExclusiveCheckbox( {onChange, value, ...props}: ExclusiveCheckboxProps ) {

    const context = useContext(ExclusiveCheckboxContext);

    const [checked, setChecked] = useState<boolean>(false);

    useEffect(() => {
        context.addChangeListener((exclude: string[]) => {
            if(exclude.includes(props.id)) {
                if(props.onChange) {
                    props.onChange(false);
                }
                setChecked(false);
            }
        })
    })

    const handleCheckboxChange = (checked: boolean) => {
        setChecked(checked);
        if(checked) {
            context.onChange(props.exclude ? [...props.exclude] : []);
        }
        if(onChange) {
            onChange(checked);
        }
    }

    return (
        <CheckboxContainer>
            <Checkbox
                onValueChange={handleCheckboxChange}
                value={value === undefined ? checked : value}
                {...props}
            />
            <CheckboxLabel>
                {props.label}
            </CheckboxLabel>
        </CheckboxContainer>
    );
}


const ListContainer = styled.View`
    gap: 4px;
`

function List( props: PropsWithChildren ) {

    const changeListeners = useRef([]);

    const addChangeListener = (listener: (exclude: string[]) => void) => {
        changeListeners.current.push(listener);
    }

    const onChange = (exclude: string[]) => {
        changeListeners.current.forEach(listener => {
            listener(exclude);
        })
    }

    return (
        <ExclusiveCheckboxContext.Provider
            value={{
                onChange,
                addChangeListener
            }}
        >
            <ListContainer>
                {props.children}
            </ListContainer>
        </ExclusiveCheckboxContext.Provider>
    )
}

ExclusiveCheckbox.List = List;

export default ExclusiveCheckbox;