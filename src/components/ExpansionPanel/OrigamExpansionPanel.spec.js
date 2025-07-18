import { mount } from '@vue/test-utils';
import Origamexpansionpanel from './OrigamExpansionPanel';

describe('Spec Origamexpansionpanel', function () {
	it('mounts', () => {
		const wrapper = mount(Origamexpansionpanel);
		expect(wrapper)
			.toBeTruthy();
	});
});
