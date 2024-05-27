import { mount } from '@vue/test-utils';
import Foxyswitch from './FoxySwitch';

describe('Spec Foxyswitch', function() {
    it('mounts', () => {
        const wrapper = mount(Foxyswitch);
        expect(wrapper)
            .toBeTruthy();
    });
});
