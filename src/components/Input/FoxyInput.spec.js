import { mount } from '@vue/test-utils';
import Foxyinput from './FoxyInput.vue';

describe('Spec Foxyinput', function () {
	it('mounts', () => {
		const wrapper = mount(Foxyinput);
		expect(wrapper)
			.toBeTruthy();
	});
});
