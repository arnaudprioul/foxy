import { mount } from '@vue/test-utils';
import Foxuivirtualscrollitem from './FoxuiVirtualScrollItem.vue';

describe('Spec Foxuivirtualscrollitem', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuivirtualscrollitem);
		expect(wrapper)
			.toBeTruthy();
	});
});
