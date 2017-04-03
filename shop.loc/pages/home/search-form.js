$(document).ready(function () {
	$('.search-form-open-btn').on('click', function () {
		$('.search-form-wraper').removeClass('search-form-wraper-hiden')
		$('.search-form-close').removeClass('search-form-close-hiden')
		$('.search-form-open-btn').addClass('search-form-close-hiden')
	})
	$('.search-form-close').on('click', function () {
		$('.search-form-wraper').addClass('search-form-wraper-hiden')
		$('.search-form-close').addClass('search-form-close-hiden')
		$('.search-form-open-btn').removeClass('search-form-close-hiden')
	})
})