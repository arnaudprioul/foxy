import { mount } from '@vue/test-utils';
import Origamcontainer from './OrigamContainer.vue';

describe('Spec Origamcontainer', function () {
	it('mounts', () => {
		const wrapper = mount(Origamcontainer);
		expect(wrapper)
			.toBeTruthy();
	});
});
