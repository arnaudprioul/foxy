import { mount } from '@vue/test-utils';
import Foxybar from './FoxyToolbar.vue';

describe('Spec Foxybar', function () {
	it('mounts', () => {
		const wrapper = mount(Foxybar);
		expect(wrapper)
			.toBeTruthy();
	});
});
