import { mount } from '@vue/test-utils';
import Origamwindow from './OrigamWindow';

describe('Spec Origamwindow', function () {
	it('mounts', () => {
		const wrapper = mount(Origamwindow);
		expect(wrapper)
			.toBeTruthy();
	});
});
