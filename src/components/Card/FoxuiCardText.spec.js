import { mount } from '@vue/test-utils';
import Foxuicardtext from './FoxuiCardText.vue';

describe('Spec Foxuicardtext', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuicardtext);
		expect(wrapper)
			.toBeTruthy();
	});
});
