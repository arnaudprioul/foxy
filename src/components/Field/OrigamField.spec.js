import { mount } from '@vue/test-utils';
import Origamfield from './OrigamField.vue';

describe('Spec Origamfield', function () {
	it('mounts', () => {
		const wrapper = mount(Origamfield);
		expect(wrapper)
			.toBeTruthy();
	});
});
