import { mount } from '@vue/test-utils';
import Foxyexpansionpanels from './FoxyExpansionPanels.vue';

describe('Spec Foxyexpansionpanels', function () {
	it('mounts', () => {
		const wrapper = mount(Foxyexpansionpanels);
		expect(wrapper)
			.toBeTruthy();
	});
});
