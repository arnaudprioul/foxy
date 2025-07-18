import { mount } from '@vue/test-utils';
import Origamdatatext from './OrigamDataText.vue';

describe('Spec Origamdatatext', function () {
	it('mounts', () => {
		const wrapper = mount(Origamdatatext);
		expect(wrapper)
			.toBeTruthy();
	});
});
