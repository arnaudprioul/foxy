import { mount } from '@vue/test-utils';
import Foxyotpinputfield from './FoxyOtpInputField';

describe('Spec Foxyotpinputfield', function () {
    it('mounts', () => {
        const wrapper = mount(Foxyotpinputfield);
        expect(wrapper)
            .toBeTruthy();
    });
});
