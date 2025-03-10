import { mount } from '@vue/test-utils';
import Foxychartpie from './FoxyChartPie.vue';

describe('Spec Foxychartpie', function () {
    it('mounts', () => {
        const wrapper = mount(Foxychartpie);
        expect(wrapper)
            .toBeTruthy();
    });
});
