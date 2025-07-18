import { mount } from '@vue/test-utils';
import Foxuilistchildren from './FoxuiListChildren.vue';

describe('Spec Foxuilistchildren', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuilistchildren);
		expect(wrapper)
			.toBeTruthy();
	});
});
