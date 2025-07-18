import { mount } from '@vue/test-utils';
import Foxuisection from './FoxuiSection';

describe('Spec Foxuisection', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuisection);
		expect(wrapper)
			.toBeTruthy();
	});
});
