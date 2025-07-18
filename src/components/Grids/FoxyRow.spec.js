import { mount } from '@vue/test-utils';
import Foxyrow from './FoxyRow.vue';

describe('Spec Foxyrow', function () {
	it('mounts', () => {
		const wrapper = mount(Foxyrow);
		expect(wrapper)
			.toBeTruthy();
	});
});
