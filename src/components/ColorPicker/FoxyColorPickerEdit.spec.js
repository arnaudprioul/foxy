import { mount } from '@vue/test-utils';
import Foxycolorpickeredit from './FoxyColorPickerEdit';

describe('Spec Foxycolorpickeredit', function () {
    it('mounts', () => {
        const wrapper = mount(Foxycolorpickeredit);
        expect(wrapper)
            .toBeTruthy();
    });
});
