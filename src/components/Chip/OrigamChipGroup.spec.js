import { mount } from '@vue/test-utils';
import Origamchipgroup from 'src/components/Chip/OrigamChipGroup.vue';

describe('Spec Origamchipgroup', function () {
	it('mounts', () => {
		const wrapper = mount(Origamchipgroup);
		expect(wrapper)
			.toBeTruthy();
	});
});
