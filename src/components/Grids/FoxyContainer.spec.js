import { mount } from '@vue/test-utils';
import Foxycontainer from './FoxyContainer.vue';

describe('Spec Foxycontainer', function () {
	it('mounts', () => {
		const wrapper = mount(Foxycontainer);
		expect(wrapper)
			.toBeTruthy();
	});
});
