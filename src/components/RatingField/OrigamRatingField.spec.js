import { mount } from '@vue/test-utils';
import Origamratingfield from './OrigamRatingField';

describe('Spec Origamratingfield', function () {
	it('mounts', () => {
		const wrapper = mount(Origamratingfield);
		expect(wrapper)
			.toBeTruthy();
	});
});
