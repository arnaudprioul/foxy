import { mount } from '@vue/test-utils';
import Foxuiprogresscircular from './FoxuiProgressCircular.vue';

describe('Spec Foxuiprogresscircular', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuiprogresscircular);
		expect(wrapper)
			.toBeTruthy();
	});
});
