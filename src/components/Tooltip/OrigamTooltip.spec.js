import { mount } from '@vue/test-utils';
import Origamtooltip from './OrigamTooltip';

describe('Spec Origamtooltip', function () {
	it('mounts', () => {
		const wrapper = mount(Origamtooltip);
		expect(wrapper)
			.toBeTruthy();
	});
});
