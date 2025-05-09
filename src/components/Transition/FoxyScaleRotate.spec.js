import { mount } from '@vue/test-utils';
import Foxyscalerotate from './FoxyScaleRotate.vue';

describe('Spec Foxyscalerotate', function () {
	it('mounts', () => {
		const wrapper = mount(Foxyscalerotate);
		expect(wrapper)
			.toBeTruthy();
	});
});
