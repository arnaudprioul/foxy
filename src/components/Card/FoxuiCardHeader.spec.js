import { mount } from '@vue/test-utils';
import Foxuicardheader from './FoxuiCardHeader.vue';

describe('Spec Foxuicardheader', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuicardheader);
		expect(wrapper)
			.toBeTruthy();
	});
});
