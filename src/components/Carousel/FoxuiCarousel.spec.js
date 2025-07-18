import { mount } from '@vue/test-utils';
import Foxuicarousel from './FoxuiCarousel';

describe('Spec Foxuicarousel', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuicarousel);
		expect(wrapper)
			.toBeTruthy();
	});
});
