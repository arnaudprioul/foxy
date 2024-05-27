import { mount } from '@vue/test-utils';
import Foxyalert from './FoxyAlert';

describe('Spec Foxyalert', function() {
    it('mounts', () => {
        const wrapper = mount(Foxyalert);
        expect(wrapper)
            .toBeTruthy();
    });
});
