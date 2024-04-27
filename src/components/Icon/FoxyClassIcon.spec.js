import { mount } from '@vue/test-utils';
import Foxyclassicon from './FoxyClassIcon.vue';

describe('Spec Foxyclassicon', function() {
    it('mounts', () => {
        const wrapper = mount(Foxyclassicon);
        expect(wrapper)
            .toBeTruthy();
    });
});
