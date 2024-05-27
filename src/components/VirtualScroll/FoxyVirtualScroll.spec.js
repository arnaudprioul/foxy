import { mount } from '@vue/test-utils';
import Foxyvirtualscroll from './FoxyVirtualScroll';

describe('Spec Foxyvirtualscroll', function() {
    it('mounts', () => {
        const wrapper = mount(Foxyvirtualscroll);
        expect(wrapper)
            .toBeTruthy();
    });
});
