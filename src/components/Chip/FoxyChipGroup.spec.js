import { mount } from '@vue/test-utils';
import Foxychipgroup from 'src/components/Chip/FoxyChipGroup.vue';

describe('Spec Foxychipgroup', function() {
    it('mounts', () => {
        const wrapper = mount(Foxychipgroup);
        expect(wrapper)
            .toBeTruthy();
    });
});
