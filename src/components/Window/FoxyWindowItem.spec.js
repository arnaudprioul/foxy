import { mount } from '@vue/test-utils';
import Foxywindowitem from './FoxyWindowItem.vue';

describe('Spec Foxywindowitem', function () {
	it('mounts', () => {
		const wrapper = mount(Foxywindowitem);
		expect(wrapper)
			.toBeTruthy();
	});
});
