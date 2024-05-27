import { mount } from '@vue/test-utils';
import Foxycardheader from './FoxyCardHeader.vue';

describe('Spec Foxycardheader', function() {
    it('mounts', () => {
        const wrapper = mount(Foxycardheader);
        expect(wrapper)
            .toBeTruthy();
    });
});
