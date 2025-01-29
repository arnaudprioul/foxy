import { mount } from '@vue/test-utils';
import Foxycolorpickerpreview from './FoxyColorPickerPreview';

describe('Spec Foxycolorpickerpreview', function () {
    it('mounts', () => {
        const wrapper = mount(Foxycolorpickerpreview);
        expect(wrapper)
            .toBeTruthy();
    });
});
