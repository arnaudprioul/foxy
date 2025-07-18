import { mount } from '@vue/test-utils';
import Origamcarousel from './OrigamCarousel';

describe('Spec Origamcarousel', function () {
	it('mounts', () => {
		const wrapper = mount(Origamcarousel);
		expect(wrapper)
			.toBeTruthy();
	});
});
