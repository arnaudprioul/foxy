import { mount } from '@vue/test-utils';
import Origamcardheader from './OrigamCardHeader.vue';

describe('Spec Origamcardheader', function () {
	it('mounts', () => {
		const wrapper = mount(Origamcardheader);
		expect(wrapper)
			.toBeTruthy();
	});
});
