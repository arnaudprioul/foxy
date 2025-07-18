import { mount } from '@vue/test-utils';
import Origamscalerotate from './OrigamScaleRotate.vue';

describe('Spec Origamscalerotate', function () {
	it('mounts', () => {
		const wrapper = mount(Origamscalerotate);
		expect(wrapper)
			.toBeTruthy();
	});
});
