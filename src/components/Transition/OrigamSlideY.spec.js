import { mount } from '@vue/test-utils';
import OrigamSlideX from './OrigamSlideX.vue';

describe('Spec OrigamSlideX', function () {
	it('mounts', () => {
		const wrapper = mount(OrigamSlideX);
		expect(wrapper)
			.toBeTruthy();
	});
});
