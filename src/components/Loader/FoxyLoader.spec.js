import { mount } from '@vue/test-utils';
import Foxyloader from './FoxyLoader';

describe('Spec Foxyloader', function () {
	it('mounts', () => {
		const wrapper = mount(Foxyloader);
		expect(wrapper)
			.toBeTruthy();
	});
});
