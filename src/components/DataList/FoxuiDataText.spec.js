import { mount } from '@vue/test-utils';
import Foxuidatatext from './FoxuiDataText.vue';

describe('Spec Foxuidatatext', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuidatatext);
		expect(wrapper)
			.toBeTruthy();
	});
});
