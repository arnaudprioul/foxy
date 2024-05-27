import { mount } from '@vue/test-utils';
import Foxyeditorwrapper from './FoxyEditWrapper.vue';

describe('Spec Foxyeditorwrapper', function() {
    it('mounts', () => {
        const wrapper = mount(Foxyeditorwrapper);
        expect(wrapper)
            .toBeTruthy();
    });
});
