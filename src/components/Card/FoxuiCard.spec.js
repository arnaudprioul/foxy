import { mount } from '@vue/test-utils';
import Foxuicard from './FoxuiCard';

describe('Spec Foxuicard', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuicard);
		expect(wrapper)
			.toBeTruthy();
	});
});
