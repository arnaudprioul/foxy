import { mount } from '@vue/test-utils';
import Origamcounter from './OrigamCounter';

describe('Spec Origamcounter', function () {
	it('mounts', () => {
		const wrapper = mount(Origamcounter);
		expect(wrapper)
			.toBeTruthy();
	});
});
