import { mount } from '@vue/test-utils';
import Foxyeditorcssbox from './FoxyCssBox.vue';

describe('Spec Foxyeditorcssbox', function () {
	it('mounts', () => {
		const wrapper = mount(Foxyeditorcssbox);
		expect(wrapper)
			.toBeTruthy();
	});
});
