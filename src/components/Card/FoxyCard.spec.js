import { mount } from '@vue/test-utils';
import Foxycard from './FoxyCard';

describe('Spec Foxycard', function () {
	it('mounts', () => {
		const wrapper = mount(Foxycard);
		expect(wrapper)
			.toBeTruthy();
	});
});
