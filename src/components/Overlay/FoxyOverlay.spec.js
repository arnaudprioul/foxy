import { mount } from '@vue/test-utils';
import Foxyoverlay from './FoxyOverlay';

describe('Spec Foxyoverlay', function() {
    it('mounts', () => {
        const wrapper = mount(Foxyoverlay);
        expect(wrapper)
            .toBeTruthy();
    });
});
