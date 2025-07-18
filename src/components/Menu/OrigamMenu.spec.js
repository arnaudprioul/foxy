import { mount } from '@vue/test-utils';
import Origammenu from './OrigamMenu';

describe('Spec Origammenu', function () {
	it('mounts', () => {
		const wrapper = mount(Origammenu);
		expect(wrapper)
			.toBeTruthy();
	});
});
