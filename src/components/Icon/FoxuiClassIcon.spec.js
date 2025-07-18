import { mount } from '@vue/test-utils';
import Foxuiclassicon from './FoxuiClassIcon.vue';

describe('Spec Foxuiclassicon', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuiclassicon);
		expect(wrapper)
			.toBeTruthy();
	});
});
