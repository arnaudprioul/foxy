import { mount } from '@vue/test-utils';
import Origamcomponenticon from './OrigamComponentIcon.vue';

describe('Spec Origamcomponenticon', function () {
	it('mounts', () => {
		const wrapper = mount(Origamcomponenticon);
		expect(wrapper)
			.toBeTruthy();
	});
});
