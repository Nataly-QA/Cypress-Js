
// Требования: поля логин и пароль
// Если не указать @ то после отправки логина и пароля получим ошибку валидации
// Поле для ввода имейла на клиенте должны приводить к строчным буквам.
// То есть неважно введёт пользователь имейл maxim@qa.studio или maXim@qa.studio, мы должны на проверку с клиента всегда посылать строчные символы

import * as data from "../helpers/default_data.json";
import * as main_page from "../locators/main_page.json";
import * as recovery_password_page from "../locators/recovery_password_page.json";
import * as result_page from "../locators/result_page.json";

//проверка авторизации (позитивный)

describe('Проверка авторизации', function () {    // название коллекции, в сайпресс называется Спека

    beforeEach('Начало теста', function () {
         cy.visit('/');
          });

    afterEach('Конец теста', function () {
         cy.get(result_page.title).should('be.visible');    // текс виден пользователю
         cy.get(result_page.close).should('be.visible');    // крестик есть и он виден пользователю
          });

    it('Верный логин и верный пароль', function () {       

         cy.get(main_page.email).type(data.login);        // ввели верный логин
         cy.get(main_page.password).type(data.password);  // ввели верный пароль
         cy.get(main_page.login_button).click();          // нажать войти
         cy.get(result_page.title).contains('Авторизация прошла успешно');  // проверяю что после авторизации вижу текст      

        })

//проверка на восстановление пароля

    it('Проверка восстановления пароля', function () {   
                   
         cy.get(main_page.fogot_pass_btn).click();                                 // нажать забыли логин
         cy.get(recovery_password_page.title).contains('Восстановите пароль');    // проверяю что появился текст о восст. пароля
         cy.get(recovery_password_page.email).type(data.login);                    // ввеcти ранее сущ. емайл 
         cy.get(recovery_password_page.send_button).click();                       // нажать отправить код
         cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // проверяю что после вижу текст
                
        })

//проверка авторизации (негативный)
   
    it('Верный логин и неверный пароль', function () {   
          
         cy.get(main_page.email).type(data.login);                               // ввели верный логин
         cy.get(main_page.password).type('iLoveqastudio14');                    // ввели неверный пароль
         cy.get(main_page.login_button).click();                               // нажать войти
         cy.get(result_page.title).contains('Такого логина или пароля нет');  // проверяю что после авторизации вижу текст
                        
        })

// проверка авторизации (негативный)

    it('Неверный логин и верный пароль', function () {      
         
         cy.get(main_page.email).type('germаааan@dolnikov.ru');                        // ввели неверный логин
         cy.get(main_page.password).type(data.password);                              // ввели верный пароль
         cy.get(main_page.login_button).click();                                     // нажать войти
         cy.get(result_page.title).contains('Нужно исправить проблему валидации');  // проверяю что после авторизации вижу текст
                
        })           
// проверка валидации:

     it('Проверка валидации, логин без @', function () {   

         cy.get(main_page.email).type('germandolnikov.ru');                            // ввели логин без @ 
         cy.get(main_page.password).type(data.password);                              // ввели верный пароль
         cy.get(main_page.login_button).click();                                     // нажать войти
         cy.get(result_page.title).contains('Нужно исправить проблему валидации');  // проверяю что после авторизации вижу текст
                
        })

// проверка на приведение к строчным буквам в логине:

     it('Проверка на приведение к строчным буквам в логине', function () {   
         
         cy.get(main_page.email).type('GerMan@Dolnikov.ru');                   // ввели верный логин в разном регистре
         cy.get(main_page.password).type(data.password);                      // ввели верный пароль
         cy.get(main_page.login_button).click();                             // нажать войти
         cy.get(result_page.title).contains('Авторизация прошла успешно');  // проверяю что после авторизации вижу текст
                
        })
 })
 
 
 // запуск через теринал: npx cypress run --spec cypress/e2e/poke.cy.js --browser chrome
 
