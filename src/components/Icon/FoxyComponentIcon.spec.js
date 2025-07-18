import { mount } from '@vue/test-utils';
import Foxycomponenticon from './FoxyComponentIcon.vue';

describe('Spec Foxycomponenticon', function () {
	it('mounts', () => {
		const wrapper = mount(Foxycomponenticon);
		expect(wrapper)
			.toBeTruthy();
	});
});
