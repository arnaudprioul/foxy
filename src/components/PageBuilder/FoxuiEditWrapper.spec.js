import { mount } from '@vue/test-utils';
import Foxuieditorwrapper from './FoxuiEditWrapper.vue';

describe('Spec Foxuieditorwrapper', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuieditorwrapper);
		expect(wrapper)
			.toBeTruthy();
	});
});
