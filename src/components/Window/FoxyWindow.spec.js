import { mount } from '@vue/test-utils';
import Foxywindow from './FoxyWindow';

describe('Spec Foxywindow', function () {
	it('mounts', () => {
		const wrapper = mount(Foxywindow);
		expect(wrapper)
			.toBeTruthy();
	});
});
