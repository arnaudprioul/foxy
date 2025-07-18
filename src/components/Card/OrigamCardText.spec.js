import { mount } from '@vue/test-utils';
import Origamcardtext from './OrigamCardText.vue';

describe('Spec Origamcardtext', function () {
	it('mounts', () => {
		const wrapper = mount(Origamcardtext);
		expect(wrapper)
			.toBeTruthy();
	});
});
