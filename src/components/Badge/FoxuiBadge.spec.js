import { mount } from '@vue/test-utils';
import Foxuibadge from './FoxuiBadge';

describe('Spec Foxuibadge', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuibadge);
		expect(wrapper)
			.toBeTruthy();
	});
});
