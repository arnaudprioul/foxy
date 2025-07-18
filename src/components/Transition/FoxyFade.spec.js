import { mount } from '@vue/test-utils';
import FoxyFade from './FoxyFade.vue';

describe('Spec Foxyfade', function () {
	it('mounts', () => {
		const wrapper = mount(FoxyFade);
		expect(wrapper)
			.toBeTruthy();
	});
});
