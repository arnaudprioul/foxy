import { mount } from '@vue/test-utils';
import Foxylistitem from './FoxyListItem.vue';

describe('Spec Foxylistitem', function() {
    it('mounts', () => {
        const wrapper = mount(Foxylistitem);
        expect(wrapper)
            .toBeTruthy();
    });
});
