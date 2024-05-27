import { mount } from '@vue/test-utils';
import Foxytoolbar from './FoxyAppBar.vue';

describe('Spec Foxytoolbar', function() {
    it('mounts', () => {
        const wrapper = mount(Foxytoolbar);
        expect(wrapper)
            .toBeTruthy();
    });
});
