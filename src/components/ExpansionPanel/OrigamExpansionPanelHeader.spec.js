import { mount } from '@vue/test-utils';
import Origamexpansionpanelheader from './OrigamExpansionPanelHeader.vue';

describe('Spec Origamexpansionpanelheader', function () {
	it('mounts', () => {
		const wrapper = mount(Origamexpansionpanelheader);
		expect(wrapper)
			.toBeTruthy();
	});
});
