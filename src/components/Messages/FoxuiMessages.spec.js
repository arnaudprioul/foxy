import { mount } from '@vue/test-utils';
import Foxuimessages from './FoxuiMessages';

describe('Spec Foxuimessages', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuimessages);
		expect(wrapper)
			.toBeTruthy();
	});
});
