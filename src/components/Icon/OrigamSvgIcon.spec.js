import { mount } from '@vue/test-utils';
import Origamsvgicon from './OrigamSvgIcon.vue';

describe('Spec Origamsvgicon', function () {
	it('mounts', () => {
		const wrapper = mount(Origamsvgicon);
		expect(wrapper)
			.toBeTruthy();
	});
});
