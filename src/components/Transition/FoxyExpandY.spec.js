import { mount } from '@vue/test-utils';
import Foxyexpand from './FoxyExpandY.vue';

describe('Spec Foxyexpand', function() {
    it('mounts', () => {
        const wrapper = mount(Foxyexpand);
        expect(wrapper)
            .toBeTruthy();
    });
});
