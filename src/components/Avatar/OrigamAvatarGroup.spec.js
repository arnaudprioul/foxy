import { mount } from '@vue/test-utils';
import OrigamAvatarGroup from './OrigamAvatarGroup';

describe('Spec OrigamAvatarGroup', function () {
	it('mounts', () => {
		const wrapper = mount(OrigamAvatarGroup);
		expect(wrapper)
			.toBeTruthy();
	});
});
