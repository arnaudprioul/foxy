import { mount } from '@vue/test-utils';
import Foxuiexpansionpanels from './FoxuiExpansionPanels.vue';

describe('Spec Foxuiexpansionpanels', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuiexpansionpanels);
		expect(wrapper)
			.toBeTruthy();
	});
});
