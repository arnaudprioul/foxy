import { mount } from '@vue/test-utils';
import Foxuiresponsive from './FoxuiResponsive';

describe('Spec Foxuiresponsive', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuiresponsive);
		expect(wrapper)
			.toBeTruthy();
	});
});
