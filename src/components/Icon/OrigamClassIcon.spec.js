import { mount } from '@vue/test-utils';
import Origamclassicon from './OrigamClassIcon.vue';

describe('Spec Origamclassicon', function () {
	it('mounts', () => {
		const wrapper = mount(Origamclassicon);
		expect(wrapper)
			.toBeTruthy();
	});
});
