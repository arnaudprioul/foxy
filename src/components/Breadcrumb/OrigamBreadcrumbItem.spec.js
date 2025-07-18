import { mount } from '@vue/test-utils';
import Origambreadcrumbitem from './OrigamBreadcrumbItem.vue';

describe('Spec Origambreadcrumbitem', function () {
	it('mounts', () => {
		const wrapper = mount(Origambreadcrumbitem);
		expect(wrapper)
			.toBeTruthy();
	});
});
