import { mount } from '@vue/test-utils';
import Foxuitooltip from './FoxuiTooltip';

describe('Spec Foxuitooltip', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuitooltip);
		expect(wrapper)
			.toBeTruthy();
	});
});
