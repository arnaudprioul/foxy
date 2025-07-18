import { mount } from '@vue/test-utils';
import Origamvirtualscrollitem from './OrigamVirtualScrollItem.vue';

describe('Spec Origamvirtualscrollitem', function () {
	it('mounts', () => {
		const wrapper = mount(Origamvirtualscrollitem);
		expect(wrapper)
			.toBeTruthy();
	});
});
