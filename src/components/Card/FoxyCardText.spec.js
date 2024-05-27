import { mount } from '@vue/test-utils';
import Foxycardtext from './FoxyCardText.vue';

describe('Spec Foxycardtext', function() {
    it('mounts', () => {
        const wrapper = mount(Foxycardtext);
        expect(wrapper)
            .toBeTruthy();
    });
});
