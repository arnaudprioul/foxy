import { mount } from '@vue/test-utils';
import Foxuicontent from './FoxuiMain.vue';

describe('Spec Foxuicontent', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuicontent);
		expect(wrapper)
			.toBeTruthy();
	});
});
