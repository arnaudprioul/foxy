import { mount } from '@vue/test-utils';
import Foxybadge from './FoxyBadge';

describe('Spec Foxybadge', function() {
    it('mounts', () => {
        const wrapper = mount(Foxybadge);
        expect(wrapper)
            .toBeTruthy();
    });
});
