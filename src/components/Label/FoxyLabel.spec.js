import { mount } from '@vue/test-utils';
import Foxylabel from './FoxyLabel.vue';

describe('Spec Foxylabel', function () {
	it('mounts', () => {
		const wrapper = mount(Foxylabel);
		expect(wrapper)
			.toBeTruthy();
	});
});
