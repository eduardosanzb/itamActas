'use strict';

describe('The login view', function () {
  var page;

  beforeEach(function () {
    browser.get('http://localhost:3000/');
    page = require('./main.po');
  });

  it('should display "Contraseña Incorrecta" toast',function(){
    var userName = element(by.model(vm.credentials.userId)).sendKeys("noExiste");
    var password = element(by.model(vm.credentials.password)).sendKeys("noPass");
    var button = element(by.id('login-button')).click();

    browser.wait(function(){
      toast.isDisplayed()
    }, 2000, 'never visible').then(
      console.log("mmmmm")
      toastMessage = $('.toaster')
      expect(toastMessage.getText()).toBe("Credenciales Incorrectas")
    })
});
