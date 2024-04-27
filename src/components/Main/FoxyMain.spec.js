import { mount } from '@vue/test-utils';
import Foxycontent from './FoxyMain.vue';

describe('Spec Foxycontent', function() {
    it('mounts', () => {
        const wrapper = mount(Foxycontent);
        expect(wrapper)
            .toBeTruthy();
    });
});
