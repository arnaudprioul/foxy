import { mount } from '@vue/test-utils';
import Foxypicker from './FoxyPicker';

describe('Spec Foxypicker', function() {
    it('mounts', () => {
        const wrapper = mount(Foxypicker);
        expect(wrapper)
            .toBeTruthy();
    });
});
