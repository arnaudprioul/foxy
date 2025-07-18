import { mount } from '@vue/test-utils';
import Origamtranslatebottom from './OrigamTranslateBottom.vue';

describe('Spec Origamtranslatebottom', function () {
	it('mounts', () => {
		const wrapper = mount(Origamtranslatebottom);
		expect(wrapper)
			.toBeTruthy();
	});
});
