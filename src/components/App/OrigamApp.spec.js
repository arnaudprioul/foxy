import { mount } from '@vue/test-utils';
import Origampagebuilder from './OrigamApp.vue';

describe('Spec Origampagebuilder', function () {
	it('mounts', () => {
		const wrapper = mount(Origampagebuilder);
		expect(wrapper)
			.toBeTruthy();
	});
});
