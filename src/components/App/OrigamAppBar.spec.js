import { mount } from '@vue/test-utils';
import Origamtoolbar from './OrigamAppBar.vue';

describe('Spec Origamtoolbar', function () {
	it('mounts', () => {
		const wrapper = mount(Origamtoolbar);
		expect(wrapper)
			.toBeTruthy();
	});
});
