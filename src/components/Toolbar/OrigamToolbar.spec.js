import { mount } from '@vue/test-utils';
import Origambar from './OrigamToolbar.vue';

describe('Spec Origambar', function () {
	it('mounts', () => {
		const wrapper = mount(Origambar);
		expect(wrapper)
			.toBeTruthy();
	});
});
