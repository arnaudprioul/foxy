import { mount } from '@vue/test-utils';
import Foxuieditorcssbox from './FoxuiCssBox.vue';

describe('Spec Foxuieditorcssbox', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuieditorcssbox);
		expect(wrapper)
			.toBeTruthy();
	});
});
