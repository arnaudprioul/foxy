import { mount } from '@vue/test-utils';
import Foxysection from './FoxySection';

describe('Spec Foxysection', function() {
    it('mounts', () => {
        const wrapper = mount(Foxysection);
        expect(wrapper)
            .toBeTruthy();
    });
});
