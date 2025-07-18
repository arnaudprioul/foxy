import { mount } from '@vue/test-utils';
import Origamtable from './OrigamTable';

describe('Spec Origamtable', function () {
	it('mounts', () => {
		const wrapper = mount(Origamtable);
		expect(wrapper)
			.toBeTruthy();
	});
});
