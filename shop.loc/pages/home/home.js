$(document).ready(function () {
	$('.spinner').spinner()

	function onlyDigit() {
		var value = $(this).val()
		value = value.replace(/[^0-9]/g, '')
		if (value == '' || value <= 0) {
			value = 1
		}
		if (value >= 1000) {
			value = 1000
		}
		$(this).val(value)
	}

	$('.spinner').on('change', onlyDigit)
	$('.spinner').on('keyup', onlyDigit)
	$('.spinner').on('keydown', function (e) {
		var key = e.keyCode
		if (48 <= key && key <= 57 || 93 <= key && key <= 105 || 37 <= key && key <= 40 || key == 8 || key == 46) {
			return true
		}
		return false
	})

	$('.product-btn-add').on('click', function () {
		var product_id = $(this).attr('data')
		var spinner = $(this).parent().parent().find('.spinner')
		var count = spinner.val()
		alert(product_id + ' ' + count)

		$.ajax({
			url: './obrabotchik.php',
			data: {
				GoodId: product_id,
				Quantity: count
			},
			type: 'GET',
			success: function (msg) {

				///alert(msg)
				alert('ОК ТОВАР В КОРЗИНе')
			}
		})

	})

	$('.product-btn-detail').on('click', function () {
		var parent = $(this).parent()
		var product_id = parent.find('.product-btn-add').attr('data')
		alert(product_id)
	})
})