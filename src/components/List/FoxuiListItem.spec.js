import { mount } from '@vue/test-utils';
import Foxuilistitem from './FoxuiListItem.vue';

describe('Spec Foxuilistitem', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuilistitem);
		expect(wrapper)
			.toBeTruthy();
	});
});
