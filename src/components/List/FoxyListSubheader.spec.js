import { mount } from '@vue/test-utils';
import Foxylistsubheader from './FoxyListSubheader.vue';

describe('Spec Foxylistsubheader', function() {
    it('mounts', () => {
        const wrapper = mount(Foxylistsubheader);
        expect(wrapper)
            .toBeTruthy();
    });
});
