import { mount } from '@vue/test-utils';
import Foxycounter from './FoxyCounter';

describe('Spec Foxycounter', function() {
    it('mounts', () => {
        const wrapper = mount(Foxycounter);
        expect(wrapper)
            .toBeTruthy();
    });
});
