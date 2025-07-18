import { mount } from '@vue/test-utils';
import Origamexpand from './OrigamExpandY.vue';

describe('Spec Origamexpand', function () {
	it('mounts', () => {
		const wrapper = mount(Origamexpand);
		expect(wrapper)
			.toBeTruthy();
	});
});
