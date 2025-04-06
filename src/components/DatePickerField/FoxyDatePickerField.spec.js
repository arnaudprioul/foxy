import { mount } from '@vue/test-utils';
import Foxydatepickerfield from './FoxyDatePickerField';

describe('Spec Foxydatepickerfield', function() {
    it('mounts', () => {
        const wrapper = mount(Foxydatepickerfield);
        expect(wrapper)
            .toBeTruthy();
    });
});
