import { mount } from '@vue/test-utils';
import Foxuidatatitle from './FoxuiDataTitle.vue';

describe('Spec Foxuidatatitle', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuidatatitle);
		expect(wrapper)
			.toBeTruthy();
	});
});
