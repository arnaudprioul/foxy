import { mount } from '@vue/test-utils';
import Foxysvgicon from './FoxySvgIcon.vue';

describe('Spec Foxysvgicon', function () {
	it('mounts', () => {
		const wrapper = mount(Foxysvgicon);
		expect(wrapper)
			.toBeTruthy();
	});
});
