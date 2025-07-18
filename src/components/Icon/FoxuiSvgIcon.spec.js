import { mount } from '@vue/test-utils';
import Foxuisvgicon from './FoxuiSvgIcon.vue';

describe('Spec Foxuisvgicon', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuisvgicon);
		expect(wrapper)
			.toBeTruthy();
	});
});
