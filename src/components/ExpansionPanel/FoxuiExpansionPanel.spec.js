import { mount } from '@vue/test-utils';
import Foxuiexpansionpanel from './FoxuiExpansionPanel';

describe('Spec Foxuiexpansionpanel', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuiexpansionpanel);
		expect(wrapper)
			.toBeTruthy();
	});
});
