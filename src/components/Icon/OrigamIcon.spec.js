import { mount } from '@vue/test-utils';
import Origamicon from './OrigamIcon';

describe('Spec Origamicon', function () {
	it('mounts', () => {
		const wrapper = mount(Origamicon);
		expect(wrapper)
			.toBeTruthy();
	});
});
