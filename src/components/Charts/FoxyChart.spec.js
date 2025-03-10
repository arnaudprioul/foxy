import { mount } from '@vue/test-utils';
import Foxychart from './FoxyChart';

describe('Spec Foxychart', function() {
    it('mounts', () => {
        const wrapper = mount(Foxychart);
        expect(wrapper)
            .toBeTruthy();
    });
});
