import { mount } from '@vue/test-utils';
import Foxyslidegroup from './FoxySlideGroup';

describe('Spec Foxyslidegroup', function() {
    it('mounts', () => {
        const wrapper = mount(Foxyslidegroup);
        expect(wrapper)
            .toBeTruthy();
    });
});
