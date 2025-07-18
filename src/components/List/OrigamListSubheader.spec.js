import { mount } from '@vue/test-utils';
import Origamlistsubheader from './OrigamListSubheader.vue';

describe('Spec Origamlistsubheader', function () {
	it('mounts', () => {
		const wrapper = mount(Origamlistsubheader);
		expect(wrapper)
			.toBeTruthy();
	});
});
