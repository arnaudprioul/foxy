import { mount } from '@vue/test-utils';
import Foxbtntoggle from './FoxuiBtnToggle.vue';

describe('Spec Foxbtntoggle', function () {
	it('mounts', () => {
		const wrapper = mount(Foxbtntoggle);
		expect(wrapper)
			.toBeTruthy();
	});
});
