import { mount } from '@vue/test-utils';
import Foxuiexpansionpanelcontent from './FoxuiExpansionPanelContent.vue';

describe('Spec Foxuiexpansionpanelcontent', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuiexpansionpanelcontent);
		expect(wrapper)
			.toBeTruthy();
	});
});
