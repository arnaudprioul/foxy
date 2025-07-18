import { mount } from '@vue/test-utils';
import Origampickertitle from './OrigamPickerTitle';

describe('Spec Origampickertitle', function () {
	it('mounts', () => {
		const wrapper = mount(Origampickertitle);
		expect(wrapper)
			.toBeTruthy();
	});
});
