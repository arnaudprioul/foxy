import { mount } from '@vue/test-utils';
import Origammessages from './OrigamMessages';

describe('Spec Origammessages', function () {
	it('mounts', () => {
		const wrapper = mount(Origammessages);
		expect(wrapper)
			.toBeTruthy();
	});
});
