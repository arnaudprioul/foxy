import { mount } from '@vue/test-utils';
import Foxyinfinitescroll from './FoxyInfiniteScroll';

describe('Spec Foxyinfinitescroll', function() {
    it('mounts', () => {
        const wrapper = mount(Foxyinfinitescroll);
        expect(wrapper)
            .toBeTruthy();
    });
});
