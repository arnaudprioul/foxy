import { mount } from '@vue/test-utils';
import Origamlabel from './OrigamLabel.vue';

describe('Spec Origamlabel', function () {
	it('mounts', () => {
		const wrapper = mount(Origamlabel);
		expect(wrapper)
			.toBeTruthy();
	});
});
