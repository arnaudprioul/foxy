import { mount } from '@vue/test-utils';
import OrigamFade from './OrigamFade.vue';

describe('Spec Origamfade', function () {
	it('mounts', () => {
		const wrapper = mount(OrigamFade);
		expect(wrapper)
			.toBeTruthy();
	});
});
