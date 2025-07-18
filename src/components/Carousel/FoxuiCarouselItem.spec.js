import { mount } from '@vue/test-utils';
import Foxuicarouselitem from './FoxuiCarouselItem.vue';

describe('Spec Foxuicarouselitem', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuicarouselitem);
		expect(wrapper)
			.toBeTruthy();
	});
});
