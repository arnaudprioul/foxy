import { mount } from '@vue/test-utils';
import Origamprogresslinear from './OrigamProgressLinear.vue';

describe('Spec Origamprogresslinear', function () {
	it('mounts', () => {
		const wrapper = mount(Origamprogresslinear);
		expect(wrapper)
			.toBeTruthy();
	});
});
