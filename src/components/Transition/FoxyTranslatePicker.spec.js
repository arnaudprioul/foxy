import { mount } from '@vue/test-utils';
import Foxytranslatepicker from './FoxyTranslatePicker.vue';

describe('Spec Foxytranslatepicker', function() {
    it('mounts', () => {
        const wrapper = mount(Foxytranslatepicker);
        expect(wrapper)
            .toBeTruthy();
    });
});
