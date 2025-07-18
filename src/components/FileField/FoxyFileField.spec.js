import { mount } from '@vue/test-utils';
import Foxyfilefield from './FoxyFileField';

describe('Spec Foxyfilefield', function () {
	it('mounts', () => {
		const wrapper = mount(Foxyfilefield);
		expect(wrapper)
			.toBeTruthy();
	});
});
