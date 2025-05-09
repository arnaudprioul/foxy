import { mount } from '@vue/test-utils';
import Foxydatatext from './FoxyDataText.vue';

describe('Spec Foxydatatext', function () {
	it('mounts', () => {
		const wrapper = mount(Foxydatatext);
		expect(wrapper)
			.toBeTruthy();
	});
});
