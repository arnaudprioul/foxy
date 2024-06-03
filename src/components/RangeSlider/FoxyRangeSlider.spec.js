import { mount } from '@vue/test-utils';
import Foxyrangeslider from './FoxyRangeSlider';

describe('Spec Foxyrangeslider', function() {
    it('mounts', () => {
        const wrapper = mount(Foxyrangeslider);
        expect(wrapper)
            .toBeTruthy();
    });
});
