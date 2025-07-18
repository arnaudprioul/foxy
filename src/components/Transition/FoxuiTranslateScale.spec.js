import { mount } from '@vue/test-utils';
import FoxuiTranslateScale from './FoxuiTranslateScale.vue';

describe('Spec FoxuiTranslateScale', function () {
	it('mounts', () => {
		const wrapper = mount(FoxuiTranslateScale);
		expect(wrapper)
			.toBeTruthy();
	});
});
