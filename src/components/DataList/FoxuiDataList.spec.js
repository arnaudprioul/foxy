import { mount } from '@vue/test-utils';
import Foxuidatalist from './FoxuiDataList.vue';

describe('Spec Foxuidatalist', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuidatalist);
		expect(wrapper)
			.toBeTruthy();
	});
});
