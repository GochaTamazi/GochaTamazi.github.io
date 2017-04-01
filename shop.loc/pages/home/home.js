$(document).ready(function () {
	$('.spinner').spinner()

	function onlyDigit() {
		var value = $(this).val()
		value = value.replace(/[^0-9]/g, '')

		var minval = $(this).attr('min')
		var maxval = $(this).attr('max')

		minval = parseInt(minval)
		maxval = parseInt(maxval)

		if (value == '' || value < minval) {
			value = minval
		}
		if (value > maxval) {
			value = maxval
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