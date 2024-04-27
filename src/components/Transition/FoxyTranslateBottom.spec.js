import { mount } from '@vue/test-utils';
import Foxytranslatebottom from './FoxyTranslateBottom.vue';

describe('Spec Foxytranslatebottom', function() {
    it('mounts', () => {
        const wrapper = mount(Foxytranslatebottom);
        expect(wrapper)
            .toBeTruthy();
    });
});
