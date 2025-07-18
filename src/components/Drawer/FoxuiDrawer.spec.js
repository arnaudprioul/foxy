import { mount } from '@vue/test-utils';
import Foxuidrawer from './FoxuiDrawer';

describe('Spec Foxuidrawer', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuidrawer);
		expect(wrapper)
			.toBeTruthy();
	});
});
