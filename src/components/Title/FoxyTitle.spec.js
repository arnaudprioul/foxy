import { mount } from '@vue/test-utils';
import Foxytitle from './FoxyTitle.vue';

describe('Spec Foxytitle', function() {
    it('mounts', () => {
        const wrapper = mount(Foxytitle);
        expect(wrapper)
            .toBeTruthy();
    });
});
