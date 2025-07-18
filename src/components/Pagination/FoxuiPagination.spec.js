import { mount } from '@vue/test-utils';
import Foxuipagination from './FoxuiPagination.vue';

describe('Spec Foxuipagination', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuipagination);
		expect(wrapper)
			.toBeTruthy();
	});
});
