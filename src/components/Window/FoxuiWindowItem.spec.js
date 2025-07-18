import { mount } from '@vue/test-utils';
import Foxuiwindowitem from './FoxuiWindowItem.vue';

describe('Spec Foxuiwindowitem', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuiwindowitem);
		expect(wrapper)
			.toBeTruthy();
	});
});
