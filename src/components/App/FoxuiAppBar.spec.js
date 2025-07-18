import { mount } from '@vue/test-utils';
import Foxuitoolbar from './FoxuiAppBar.vue';

describe('Spec Foxuitoolbar', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuitoolbar);
		expect(wrapper)
			.toBeTruthy();
	});
});
