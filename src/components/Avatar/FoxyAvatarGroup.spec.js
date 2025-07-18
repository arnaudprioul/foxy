import { mount } from '@vue/test-utils';
import FoxyAvatarGroup from './FoxyAvatarGroup';

describe('Spec FoxyAvatarGroup', function () {
	it('mounts', () => {
		const wrapper = mount(FoxyAvatarGroup);
		expect(wrapper)
			.toBeTruthy();
	});
});
