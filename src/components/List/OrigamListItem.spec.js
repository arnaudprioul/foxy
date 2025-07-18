import { mount } from '@vue/test-utils';
import Origamlistitem from './OrigamListItem.vue';

describe('Spec Origamlistitem', function () {
	it('mounts', () => {
		const wrapper = mount(Origamlistitem);
		expect(wrapper)
			.toBeTruthy();
	});
});
