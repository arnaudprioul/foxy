import { mount } from '@vue/test-utils';
import Origamsheet from './OrigamSheet';

describe('Spec Origamsheet', function () {
	it('mounts', () => {
		const wrapper = mount(Origamsheet);
		expect(wrapper)
			.toBeTruthy();
	});
});
