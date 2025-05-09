import { mount } from '@vue/test-utils';
import Foxyvirtualscrollitem from './FoxyVirtualScrollItem.vue';

describe('Spec Foxyvirtualscrollitem', function () {
	it('mounts', () => {
		const wrapper = mount(Foxyvirtualscrollitem);
		expect(wrapper)
			.toBeTruthy();
	});
});
