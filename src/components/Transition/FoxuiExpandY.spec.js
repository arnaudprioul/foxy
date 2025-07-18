import { mount } from '@vue/test-utils';
import Foxuiexpand from './FoxuiExpandY.vue';

describe('Spec Foxuiexpand', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuiexpand);
		expect(wrapper)
			.toBeTruthy();
	});
});
