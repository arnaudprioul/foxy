import { mount } from '@vue/test-utils';
import Foxycheckbox from './FoxyCheckbox.vue';

describe('Spec Foxycheckbox', function() {
    it('mounts', () => {
        const wrapper = mount(Foxycheckbox);
        expect(wrapper)
            .toBeTruthy();
    });
});
