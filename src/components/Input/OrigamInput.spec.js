import { mount } from '@vue/test-utils';
import Origaminput from './OrigamInput.vue';

describe('Spec Origaminput', function () {
	it('mounts', () => {
		const wrapper = mount(Origaminput);
		expect(wrapper)
			.toBeTruthy();
	});
});
