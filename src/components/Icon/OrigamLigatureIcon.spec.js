import { mount } from '@vue/test-utils';
import Origamligatureicon from './OrigamLigatureIcon.vue';

describe('Spec Origamligatureicon', function () {
	it('mounts', () => {
		const wrapper = mount(Origamligatureicon);
		expect(wrapper)
			.toBeTruthy();
	});
});
