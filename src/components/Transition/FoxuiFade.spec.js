import { mount } from '@vue/test-utils';
import FoxuiFade from './FoxuiFade.vue';

describe('Spec Foxuifade', function () {
	it('mounts', () => {
		const wrapper = mount(FoxuiFade);
		expect(wrapper)
			.toBeTruthy();
	});
});
