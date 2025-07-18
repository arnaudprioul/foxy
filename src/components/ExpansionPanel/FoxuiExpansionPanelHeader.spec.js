import { mount } from '@vue/test-utils';
import Foxuiexpansionpanelheader from './FoxuiExpansionPanelHeader.vue';

describe('Spec Foxuiexpansionpanelheader', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuiexpansionpanelheader);
		expect(wrapper)
			.toBeTruthy();
	});
});
