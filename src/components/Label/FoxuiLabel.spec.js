import { mount } from '@vue/test-utils';
import Foxuilabel from './FoxuiLabel.vue';

describe('Spec Foxuilabel', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuilabel);
		expect(wrapper)
			.toBeTruthy();
	});
});
