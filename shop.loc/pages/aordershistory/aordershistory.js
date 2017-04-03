$(document).ready(function () {
	$('.OrderStatusIdSelect').change(function () {
		var cur = $(this)
		var selected = cur.find('option:selected')
		var clas = selected.attr('class')

		cur.attr('class', 'form-control OrderStatusIdSelect')
		cur.parent().attr('class', '')

		cur.addClass(clas)
		cur.parent().addClass(clas)

		var orderid = selected.parent().attr('data')
		var value = selected.attr('value')
		var html = selected.html()

		alert(orderid + ' ' + value + ' ' + html)
	})
	var cur = $('.OrderStatusIdSelect')
	var clas = cur.find('option:selected').attr('class')

	cur.attr('class', 'form-control OrderStatusIdSelect')
	cur.parent().attr('class', '')

	cur.addClass(clas)
	cur.parent().addClass(clas)

})