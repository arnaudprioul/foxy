import { mount } from '@vue/test-utils';
import Foxuilistgroup from './FoxuiListGroup.vue';

describe('Spec Foxuilistgroup', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuilistgroup);
		expect(wrapper)
			.toBeTruthy();
	});
});
