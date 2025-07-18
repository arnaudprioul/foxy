import { mount } from '@vue/test-utils';
import Origamradio from './OrigamRadio';

describe('Spec Origamradio', function () {
	it('mounts', () => {
		const wrapper = mount(Origamradio);
		expect(wrapper)
			.toBeTruthy();
	});
});
