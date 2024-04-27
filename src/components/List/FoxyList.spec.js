import { mount } from '@vue/test-utils';
import Foxylist from './FoxyList';

describe('Spec Foxylist', function() {
    it('mounts', () => {
        const wrapper = mount(Foxylist);
        expect(wrapper)
            .toBeTruthy();
    });
});
