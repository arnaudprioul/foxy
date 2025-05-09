import { mount } from '@vue/test-utils';
import Foxytextfield from './FoxyTextField';

describe('Spec Foxytextfield', function () {
	it('mounts', () => {
		const wrapper = mount(Foxytextfield);
		expect(wrapper)
			.toBeTruthy();
	});
});
