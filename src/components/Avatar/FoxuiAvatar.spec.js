import { mount } from '@vue/test-utils';
import Foxuiavatar from './FoxuiAvatar';

describe('Spec Foxuiavatar', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuiavatar);
		expect(wrapper)
			.toBeTruthy();
	});
});
