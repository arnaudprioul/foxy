import { mount } from '@vue/test-utils';
import Foxyicon from './FoxyIcon';

describe('Spec Foxyicon', function () {
	it('mounts', () => {
		const wrapper = mount(Foxyicon);
		expect(wrapper)
			.toBeTruthy();
	});
});
