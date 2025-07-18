import { mount } from '@vue/test-utils';
import Foxuioverlayscrim from './FoxuiOverlayScrim.vue';

describe('Spec Foxuioverlayscrim', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuioverlayscrim);
		expect(wrapper)
			.toBeTruthy();
	});
});
