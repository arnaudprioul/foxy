import { mount } from '@vue/test-utils';
import Origamswitch from './OrigamSwitch';

describe('Spec Origamswitch', function () {
	it('mounts', () => {
		const wrapper = mount(Origamswitch);
		expect(wrapper)
			.toBeTruthy();
	});
});
