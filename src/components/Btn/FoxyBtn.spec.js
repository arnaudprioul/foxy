import { mount } from '@vue/test-utils';
import Foxybtn from './FoxyBtn';

describe('Spec Foxybtn', function () {
	it('mounts', () => {
		const wrapper = mount(Foxybtn);
		expect(wrapper)
			.toBeTruthy();
	});
});
