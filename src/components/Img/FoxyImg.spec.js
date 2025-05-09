import { mount } from '@vue/test-utils';
import Foxyimg from './FoxyImg';

describe('Spec Foxyimg', function () {
	it('mounts', () => {
		const wrapper = mount(Foxyimg);
		expect(wrapper)
			.toBeTruthy();
	});
});
