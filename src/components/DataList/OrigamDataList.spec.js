import { mount } from '@vue/test-utils';
import Origamdatalist from './OrigamDataList.vue';

describe('Spec Origamdatalist', function () {
	it('mounts', () => {
		const wrapper = mount(Origamdatalist);
		expect(wrapper)
			.toBeTruthy();
	});
});
