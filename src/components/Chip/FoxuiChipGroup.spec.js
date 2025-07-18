import { mount } from '@vue/test-utils';
import Foxuichipgroup from 'src/components/Chip/FoxuiChipGroup.vue';

describe('Spec Foxuichipgroup', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuichipgroup);
		expect(wrapper)
			.toBeTruthy();
	});
});
