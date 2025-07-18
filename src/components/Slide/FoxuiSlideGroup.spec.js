import { mount } from '@vue/test-utils';
import Foxuislidegroup from './FoxuiSlideGroup';

describe('Spec Foxuislidegroup', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuislidegroup);
		expect(wrapper)
			.toBeTruthy();
	});
});
