import { mount } from '@vue/test-utils';
import Foxydatepicker from './FoxyDatePicker';

describe('Spec Foxydatepicker', function() {
    it('mounts', () => {
        const wrapper = mount(Foxydatepicker);
        expect(wrapper)
            .toBeTruthy();
    });
});
