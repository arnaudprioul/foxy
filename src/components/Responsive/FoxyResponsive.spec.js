import { mount } from '@vue/test-utils';
import Foxyresponsive from './FoxyResponsive';

describe('Spec Foxyresponsive', function () {
	it('mounts', () => {
		const wrapper = mount(Foxyresponsive);
		expect(wrapper)
			.toBeTruthy();
	});
});
