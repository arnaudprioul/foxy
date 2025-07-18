import { mount } from '@vue/test-utils';
import Origamsection from './OrigamSection';

describe('Spec Origamsection', function () {
	it('mounts', () => {
		const wrapper = mount(Origamsection);
		expect(wrapper)
			.toBeTruthy();
	});
});
