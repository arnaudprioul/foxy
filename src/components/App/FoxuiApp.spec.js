import { mount } from '@vue/test-utils';
import Foxuipagebuilder from './FoxuiApp.vue';

describe('Spec Foxuipagebuilder', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuipagebuilder);
		expect(wrapper)
			.toBeTruthy();
	});
});
