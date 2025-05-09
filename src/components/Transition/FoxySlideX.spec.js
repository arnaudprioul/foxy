import { mount } from '@vue/test-utils';
import FoxySlideX from './FoxySlideX.vue';

describe('Spec FoxySlideX', function () {
	it('mounts', () => {
		const wrapper = mount(FoxySlideX);
		expect(wrapper)
			.toBeTruthy();
	});
});
