import { mount } from '@vue/test-utils';
import Foxuichip from './FoxuiChip';

describe('Spec Foxuichip', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuichip);
		expect(wrapper)
			.toBeTruthy();
	});
});
