import { mount } from '@vue/test-utils';
import Foxysheet from './FoxySheet';

describe('Spec Foxysheet', function () {
	it('mounts', () => {
		const wrapper = mount(Foxysheet);
		expect(wrapper)
			.toBeTruthy();
	});
});
