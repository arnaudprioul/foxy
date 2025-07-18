import { mount } from '@vue/test-utils';
import Origamslidegroup from './OrigamSlideGroup';

describe('Spec Origamslidegroup', function () {
	it('mounts', () => {
		const wrapper = mount(Origamslidegroup);
		expect(wrapper)
			.toBeTruthy();
	});
});
