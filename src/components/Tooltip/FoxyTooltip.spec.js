import { mount } from '@vue/test-utils';
import Foxytooltip from './FoxyTooltip';

describe('Spec Foxytooltip', function () {
	it('mounts', () => {
		const wrapper = mount(Foxytooltip);
		expect(wrapper)
			.toBeTruthy();
	});
});
