import { mount } from '@vue/test-utils';
import Foxycolorpicker from './FoxyColorPicker';

describe('Spec Foxycolorpicker', function() {
    it('mounts', () => {
        const wrapper = mount(Foxycolorpicker);
        expect(wrapper)
            .toBeTruthy();
    });
});
