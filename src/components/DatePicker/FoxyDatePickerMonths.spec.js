import { mount } from '@vue/test-utils';
import Foxydatepickermonths from './FoxyDatePickerMonths';

describe('Spec Foxydatepickermonths', function() {
    it('mounts', () => {
        const wrapper = mount(Foxydatepickermonths);
        expect(wrapper)
            .toBeTruthy();
    });
});
