import { mount } from '@vue/test-utils';
import Origamtitle from './OrigamTitle.vue';

describe('Spec Origamtitle', function () {
	it('mounts', () => {
		const wrapper = mount(Origamtitle);
		expect(wrapper)
			.toBeTruthy();
	});
});
