import { mount } from '@vue/test-utils';
import Origamrow from './OrigamSpacer.vue';

describe('Spec Origamrow', function () {
	it('mounts', () => {
		const wrapper = mount(Origamrow);
		expect(wrapper)
			.toBeTruthy();
	});
});
