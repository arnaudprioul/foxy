import { mount } from '@vue/test-utils';
import FoxyContextualMenu from './FoxyContextualMenu';

describe('Spec FoxyContextualMenu', function() {
    it('mounts', () => {
        const wrapper = mount(FoxyContextualMenu);
        expect(wrapper)
            .toBeTruthy();
    });
});
