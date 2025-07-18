import { mount } from '@vue/test-utils';
import FoxuiAvatarGroup from './FoxuiAvatarGroup';

describe('Spec FoxuiAvatarGroup', function () {
	it('mounts', () => {
		const wrapper = mount(FoxuiAvatarGroup);
		expect(wrapper)
			.toBeTruthy();
	});
});
