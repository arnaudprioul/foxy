import { mount } from '@vue/test-utils';
import Foxuitextareafield from './FoxuiTextareaField';

describe('Spec Foxuitextareafield', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuitextareafield);
		expect(wrapper)
			.toBeTruthy();
	});
});
