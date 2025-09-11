import { render, screen, userEvent } from '@testing-library/react-native';

import ExclusiveCheckbox from './ExclusiveCheckbox';

describe('<ExclusiveCheckbox/>', () => {
    it('Should not allow user to check exclusive/incompatible checkboxes', async () => {
        render(<ExclusiveCheckbox.List>
            <ExclusiveCheckbox
                accessibilityLabel='1'
                id='1'
                exclude={['2', '3']}
            />
            <ExclusiveCheckbox
                accessibilityLabel='2'
                id='2'
            />
            <ExclusiveCheckbox
                accessibilityLabel='3'
                id='3'
            />
            <ExclusiveCheckbox
                accessibilityLabel='4'
                id='4'
            />
        </ExclusiveCheckbox.List>)

        const user = userEvent.setup();

        const _1 = screen.getByLabelText('1');
        const _2 = screen.getByLabelText('2');
        const _3 = screen.getByLabelText('3');
        const _4 = screen.getByLabelText('4');

        await user.press(await _2);
        await user.press(await _3);
        await user.press(await _4);

        expect(_1).not.toBeChecked();
        expect(_2).toBeChecked();
        expect(_3).toBeChecked();
        expect(_4).toBeChecked();

        await user.press(await _1);

        expect(_1).toBeChecked();
        expect(_2).not.toBeChecked();
        expect(_3).not.toBeChecked();
        expect(_4).toBeChecked();
    })
})