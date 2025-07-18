import { mount } from '@vue/test-utils';
import Origamnumberfield from './OrigamNumberField';

describe('Spec Origamnumberfield', function () {
	it('mounts', () => {
		const wrapper = mount(Origamnumberfield);
		expect(wrapper)
			.toBeTruthy();
	});
});
