import { mount } from '@vue/test-utils';
import Origamrow from './OrigamCol.vue';

describe('Spec Origamrow', function () {
	it('mounts', () => {
		const wrapper = mount(Origamrow);
		expect(wrapper)
			.toBeTruthy();
	});
});
