import { mount } from '@vue/test-utils';
import Origamtextareafield from './OrigamTextareaField';

describe('Spec Origamtextareafield', function () {
	it('mounts', () => {
		const wrapper = mount(Origamtextareafield);
		expect(wrapper)
			.toBeTruthy();
	});
});
