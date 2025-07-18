import { mount } from '@vue/test-utils';
import Origamavatar from './OrigamAvatar';

describe('Spec Origamavatar', function () {
	it('mounts', () => {
		const wrapper = mount(Origamavatar);
		expect(wrapper)
			.toBeTruthy();
	});
});
