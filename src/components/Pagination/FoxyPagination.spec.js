import { mount } from '@vue/test-utils';
import Foxypagination from './FoxyPagination.vue';

describe('Spec Foxypagination', function() {
    it('mounts', () => {
        const wrapper = mount(Foxypagination);
        expect(wrapper)
            .toBeTruthy();
    });
});
