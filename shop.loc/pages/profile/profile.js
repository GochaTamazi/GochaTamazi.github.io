$(document).ready(function () {
	$('#BirthDate').datepicker({dateFormat: 'dd.mm.yy'})

	function validatePassword() {
		var pas = Password.val()
		var conf = Comfirm.val()
		if (pas != conf) {
			Comfirm.get(0).setCustomValidity('Пароли не совпадают')
		} else {
			Comfirm.get(0).setCustomValidity('')
		}
	}

	var Password = $('#Password')
	Password.on('change', validatePassword)

	var Comfirm = $('#Comfirm')
	Comfirm.on('keyup', validatePassword)
	
})