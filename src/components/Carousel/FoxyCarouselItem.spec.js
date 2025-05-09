import { mount } from '@vue/test-utils';
import Foxycarouselitem from './FoxyCarouselItem.vue';

describe('Spec Foxycarouselitem', function () {
	it('mounts', () => {
		const wrapper = mount(Foxycarouselitem);
		expect(wrapper)
			.toBeTruthy();
	});
});
