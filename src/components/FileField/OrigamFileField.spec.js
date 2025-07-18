import { mount } from '@vue/test-utils';
import Origamfilefield from './OrigamFileField';

describe('Spec Origamfilefield', function () {
	it('mounts', () => {
		const wrapper = mount(Origamfilefield);
		expect(wrapper)
			.toBeTruthy();
	});
});
