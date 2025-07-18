import { mount } from '@vue/test-utils';
import OrigamTranslateScale from './OrigamTranslateScale.vue';

describe('Spec OrigamTranslateScale', function () {
	it('mounts', () => {
		const wrapper = mount(OrigamTranslateScale);
		expect(wrapper)
			.toBeTruthy();
	});
});
