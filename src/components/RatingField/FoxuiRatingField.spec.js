import { mount } from '@vue/test-utils';
import Foxuiratingfield from './FoxuiRatingField';

describe('Spec Foxuiratingfield', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuiratingfield);
		expect(wrapper)
			.toBeTruthy();
	});
});
