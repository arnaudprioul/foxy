import { mount } from '@vue/test-utils';
import FoxyTranslateScale from './FoxyTranslateScale.vue';

describe('Spec FoxyTranslateScale', function () {
	it('mounts', () => {
		const wrapper = mount(FoxyTranslateScale);
		expect(wrapper)
			.toBeTruthy();
	});
});
