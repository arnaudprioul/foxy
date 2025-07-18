import { mount } from '@vue/test-utils';
import Origamdatatitle from './OrigamDataTitle.vue';

describe('Spec Origamdatatitle', function () {
	it('mounts', () => {
		const wrapper = mount(Origamdatatitle);
		expect(wrapper)
			.toBeTruthy();
	});
});
