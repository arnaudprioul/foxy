import { mount } from '@vue/test-utils';
import Foxybreadcrumbitem from './FoxyBreadcrumbItem.vue';

describe('Spec Foxybreadcrumbitem', function () {
	it('mounts', () => {
		const wrapper = mount(Foxybreadcrumbitem);
		expect(wrapper)
			.toBeTruthy();
	});
});
