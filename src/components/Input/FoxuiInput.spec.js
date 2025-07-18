import { mount } from '@vue/test-utils';
import Foxuiinput from './FoxuiInput.vue';

describe('Spec Foxuiinput', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuiinput);
		expect(wrapper)
			.toBeTruthy();
	});
});
