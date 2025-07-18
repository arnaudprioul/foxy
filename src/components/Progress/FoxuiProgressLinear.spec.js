import { mount } from '@vue/test-utils';
import Foxuiprogresslinear from './FoxuiProgressLinear.vue';

describe('Spec Foxuiprogresslinear', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuiprogresslinear);
		expect(wrapper)
			.toBeTruthy();
	});
});
