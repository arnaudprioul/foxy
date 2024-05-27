import { mount } from '@vue/test-utils';
import Foxybtngroup from './FoxyBtnGroup.vue';

describe('Spec Foxybtngroup', function() {
    it('mounts', () => {
        const wrapper = mount(Foxybtngroup);
        expect(wrapper)
            .toBeTruthy();
    });
});
