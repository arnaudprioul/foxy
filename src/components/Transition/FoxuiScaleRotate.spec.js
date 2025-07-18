import { mount } from '@vue/test-utils';
import Foxuiscalerotate from './FoxuiScaleRotate.vue';

describe('Spec Foxuiscalerotate', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuiscalerotate);
		expect(wrapper)
			.toBeTruthy();
	});
});
