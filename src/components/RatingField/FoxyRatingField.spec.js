import { mount } from '@vue/test-utils';
import Foxyratingfield from './FoxyRatingField';

describe('Spec Foxyratingfield', function () {
	it('mounts', () => {
		const wrapper = mount(Foxyratingfield);
		expect(wrapper)
			.toBeTruthy();
	});
});
