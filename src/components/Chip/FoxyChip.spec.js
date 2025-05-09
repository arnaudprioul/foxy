import { mount } from '@vue/test-utils';
import Foxychip from './FoxyChip';

describe('Spec Foxychip', function () {
	it('mounts', () => {
		const wrapper = mount(Foxychip);
		expect(wrapper)
			.toBeTruthy();
	});
});
