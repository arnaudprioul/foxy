import { mount } from '@vue/test-utils';
import Foxtransiton from './FoxuiTransition.vue';

describe('Spec Foxtransiton', function () {
	it('mounts', () => {
		const wrapper = mount(Foxtransiton);
		expect(wrapper)
			.toBeTruthy();
	});
});
