import { mount } from '@vue/test-utils';
import Foxyoverlayscrim from './FoxyOverlayScrim.vue';

describe('Spec Foxyoverlayscrim', function() {
    it('mounts', () => {
        const wrapper = mount(Foxyoverlayscrim);
        expect(wrapper)
            .toBeTruthy();
    });
});
