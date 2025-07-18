import { mount } from '@vue/test-utils';
import Origamlistchildren from './OrigamListChildren.vue';

describe('Spec Origamlistchildren', function () {
	it('mounts', () => {
		const wrapper = mount(Origamlistchildren);
		expect(wrapper)
			.toBeTruthy();
	});
});
