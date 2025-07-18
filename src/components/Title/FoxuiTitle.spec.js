import { mount } from '@vue/test-utils';
import Foxuititle from './FoxuiTitle.vue';

describe('Spec Foxuititle', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuititle);
		expect(wrapper)
			.toBeTruthy();
	});
});
