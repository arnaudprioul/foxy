import { mount } from '@vue/test-utils';
import Foxyavatar from './FoxyAvatar';

describe('Spec Foxyavatar', function() {
    it('mounts', () => {
        const wrapper = mount(Foxyavatar);
        expect(wrapper)
            .toBeTruthy();
    });
});
