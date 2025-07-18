import { mount } from '@vue/test-utils';
import Origamprogresscircular from './OrigamProgressCircular.vue';

describe('Spec Origamprogresscircular', function () {
	it('mounts', () => {
		const wrapper = mount(Origamprogresscircular);
		expect(wrapper)
			.toBeTruthy();
	});
});
