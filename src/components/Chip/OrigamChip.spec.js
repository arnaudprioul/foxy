import { mount } from '@vue/test-utils';
import Origamchip from './OrigamChip';

describe('Spec Origamchip', function () {
	it('mounts', () => {
		const wrapper = mount(Origamchip);
		expect(wrapper)
			.toBeTruthy();
	});
});
