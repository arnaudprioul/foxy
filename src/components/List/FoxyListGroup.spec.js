import { mount } from '@vue/test-utils';
import Foxylistgroup from './FoxyListGroup.vue';

describe('Spec Foxylistgroup', function() {
    it('mounts', () => {
        const wrapper = mount(Foxylistgroup);
        expect(wrapper)
            .toBeTruthy();
    });
});
