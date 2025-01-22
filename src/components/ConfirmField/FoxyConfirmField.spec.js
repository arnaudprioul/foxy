import { mount } from '@vue/test-utils';
import Foxyconfirmfield from './FoxyConfirmFIeld';

describe('Spec Foxyconfirmfield', function () {
    it('mounts', () => {
        const wrapper = mount(Foxyconfirmfield);
        expect(wrapper)
            .toBeTruthy();
    });
});
