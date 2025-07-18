import { mount } from '@vue/test-utils';
import Origampagination from './OrigamPagination.vue';

describe('Spec Origampagination', function () {
	it('mounts', () => {
		const wrapper = mount(Origampagination);
		expect(wrapper)
			.toBeTruthy();
	});
});
