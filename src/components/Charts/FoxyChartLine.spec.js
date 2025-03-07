import { mount } from '@vue/test-utils';
import Foxychartline from './FoxyChartLine.vue';

describe('Spec Foxychartline', function () {
    it('mounts', () => {
        const wrapper = mount(Foxychartline);
        expect(wrapper)
            .toBeTruthy();
    });
});
