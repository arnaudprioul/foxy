import { mount } from '@vue/test-utils';
import Origamexpansionpanels from './OrigamExpansionPanels.vue';

describe('Spec Origamexpansionpanels', function () {
	it('mounts', () => {
		const wrapper = mount(Origamexpansionpanels);
		expect(wrapper)
			.toBeTruthy();
	});
});
