import { mount } from '@vue/test-utils';
import Foxuiligatureicon from './FoxuiLigatureIcon.vue';

describe('Spec Foxuiligatureicon', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuiligatureicon);
		expect(wrapper)
			.toBeTruthy();
	});
});
