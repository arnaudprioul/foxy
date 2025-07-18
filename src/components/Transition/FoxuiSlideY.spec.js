import { mount } from '@vue/test-utils';
import FoxuiSlideX from './FoxuiSlideX.vue';

describe('Spec FoxuiSlideX', function () {
	it('mounts', () => {
		const wrapper = mount(FoxuiSlideX);
		expect(wrapper)
			.toBeTruthy();
	});
});
