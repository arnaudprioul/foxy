import { mount } from '@vue/test-utils';
import Foxuiwindow from './FoxuiWindow';

describe('Spec Foxuiwindow', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuiwindow);
		expect(wrapper)
			.toBeTruthy();
	});
});
