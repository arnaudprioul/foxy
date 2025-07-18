import { mount } from '@vue/test-utils';
import Foxuicontainer from './FoxuiContainer.vue';

describe('Spec Foxuicontainer', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuicontainer);
		expect(wrapper)
			.toBeTruthy();
	});
});
