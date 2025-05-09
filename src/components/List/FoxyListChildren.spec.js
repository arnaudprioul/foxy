import { mount } from '@vue/test-utils';
import Foxylistchildren from './FoxyListChildren.vue';

describe('Spec Foxylistchildren', function () {
	it('mounts', () => {
		const wrapper = mount(Foxylistchildren);
		expect(wrapper)
			.toBeTruthy();
	});
});
