import { mount } from '@vue/test-utils';
import Origamoverlayscrim from './OrigamOverlayScrim.vue';

describe('Spec Origamoverlayscrim', function () {
	it('mounts', () => {
		const wrapper = mount(Origamoverlayscrim);
		expect(wrapper)
			.toBeTruthy();
	});
});
