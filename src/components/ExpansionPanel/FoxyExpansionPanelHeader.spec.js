import { mount } from '@vue/test-utils';
import Foxyexpansionpanelheader from './FoxyExpansionPanelHeader.vue';

describe('Spec Foxyexpansionpanelheader', function () {
	it('mounts', () => {
		const wrapper = mount(Foxyexpansionpanelheader);
		expect(wrapper)
			.toBeTruthy();
	});
});
