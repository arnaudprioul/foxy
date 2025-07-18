import { mount } from '@vue/test-utils';
import Origamcarouselitem from './OrigamCarouselItem.vue';

describe('Spec Origamcarouselitem', function () {
	it('mounts', () => {
		const wrapper = mount(Origamcarouselitem);
		expect(wrapper)
			.toBeTruthy();
	});
});
