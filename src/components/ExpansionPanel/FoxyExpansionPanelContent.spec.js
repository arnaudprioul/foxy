import { mount } from '@vue/test-utils';
import Foxyexpansionpanelcontent from './FoxyExpansionPanelContent.vue';

describe('Spec Foxyexpansionpanelcontent', function () {
	it('mounts', () => {
		const wrapper = mount(Foxyexpansionpanelcontent);
		expect(wrapper)
			.toBeTruthy();
	});
});
