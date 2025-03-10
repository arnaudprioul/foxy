import { mount } from '@vue/test-utils';
import Foxychartbar from './FoxyChartBar.vue';

describe('Spec Foxychartbar', function () {
    it('mounts', () => {
        const wrapper = mount(Foxychartbar);
        expect(wrapper)
            .toBeTruthy();
    });
});
