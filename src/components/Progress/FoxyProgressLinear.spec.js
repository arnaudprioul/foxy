import { mount } from '@vue/test-utils';
import Foxyprogresslinear from './FoxyProgressLinear.vue';

describe('Spec Foxyprogresslinear', function () {
	it('mounts', () => {
		const wrapper = mount(Foxyprogresslinear);
		expect(wrapper)
			.toBeTruthy();
	});
});
