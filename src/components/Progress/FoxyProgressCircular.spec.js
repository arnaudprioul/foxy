import { mount } from '@vue/test-utils';
import Foxyprogresscircular from './FoxyProgressCircular.vue';

describe('Spec Foxyprogresscircular', function () {
	it('mounts', () => {
		const wrapper = mount(Foxyprogresscircular);
		expect(wrapper)
			.toBeTruthy();
	});
});
