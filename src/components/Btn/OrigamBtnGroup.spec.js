import { mount } from '@vue/test-utils';
import Origambtngroup from './OrigamBtnGroup.vue';

describe('Spec Origambtngroup', function () {
	it('mounts', () => {
		const wrapper = mount(Origambtngroup);
		expect(wrapper)
			.toBeTruthy();
	});
});
