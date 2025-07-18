import { mount } from '@vue/test-utils';
import Origamtextfield from './OrigamTextField';

describe('Spec Origamtextfield', function () {
	it('mounts', () => {
		const wrapper = mount(Origamtextfield);
		expect(wrapper)
			.toBeTruthy();
	});
});
