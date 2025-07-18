import { mount } from '@vue/test-utils';
import Origamwindowitem from './OrigamWindowItem.vue';

describe('Spec Origamwindowitem', function () {
	it('mounts', () => {
		const wrapper = mount(Origamwindowitem);
		expect(wrapper)
			.toBeTruthy();
	});
});
