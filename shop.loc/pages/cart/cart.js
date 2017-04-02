$(document).ready(function () {
	var countLi = $('#clientAddressId option').length
	if (countLi <= 0) {
		$('#clientAddressId').addClass('hiden')
		$('.cart-create-address-url').removeClass('hiden')
	}
})