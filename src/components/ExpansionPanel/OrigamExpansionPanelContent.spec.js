import { mount } from '@vue/test-utils';
import Origamexpansionpanelcontent from './OrigamExpansionPanelContent.vue';

describe('Spec Origamexpansionpanelcontent', function () {
	it('mounts', () => {
		const wrapper = mount(Origamexpansionpanelcontent);
		expect(wrapper)
			.toBeTruthy();
	});
});
