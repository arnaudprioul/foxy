import { mount } from '@vue/test-utils';
import Foxydatalist from './FoxyDataList.vue';

describe('Spec Foxydatalist', function () {
	it('mounts', () => {
		const wrapper = mount(Foxydatalist);
		expect(wrapper)
			.toBeTruthy();
	});
});
