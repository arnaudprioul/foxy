import { mount } from '@vue/test-utils';
import Foxycarousel from './FoxyCarousel';

describe('Spec Foxycarousel', function() {
    it('mounts', () => {
        const wrapper = mount(Foxycarousel);
        expect(wrapper)
            .toBeTruthy();
    });
});
