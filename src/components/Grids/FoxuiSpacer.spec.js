import { mount } from '@vue/test-utils';
import Foxuirow from './FoxuiSpacer.vue';

describe('Spec Foxuirow', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuirow);
		expect(wrapper)
			.toBeTruthy();
	});
});
