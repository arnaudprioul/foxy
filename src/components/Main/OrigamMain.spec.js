import { mount } from '@vue/test-utils';
import Origamcontent from './OrigamMain.vue';

describe('Spec Origamcontent', function () {
	it('mounts', () => {
		const wrapper = mount(Origamcontent);
		expect(wrapper)
			.toBeTruthy();
	});
});
