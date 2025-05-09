import { mount } from '@vue/test-utils';
import Foxynumberfield from './FoxyNumberField';

describe('Spec Foxynumberfield', function () {
	it('mounts', () => {
		const wrapper = mount(Foxynumberfield);
		expect(wrapper)
			.toBeTruthy();
	});
});
