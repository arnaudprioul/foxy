import { mount } from '@vue/test-utils';
import Foxtransiton from './OrigamTransition.vue';

describe('Spec Foxtransiton', function () {
	it('mounts', () => {
		const wrapper = mount(Foxtransiton);
		expect(wrapper)
			.toBeTruthy();
	});
});
