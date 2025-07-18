import { mount } from '@vue/test-utils';
import Foxuibar from './FoxuiToolbar.vue';

describe('Spec Foxuibar', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuibar);
		expect(wrapper)
			.toBeTruthy();
	});
});
