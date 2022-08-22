"use strict";
document.addEventListener('DOMContentLoaded' ,() =>{
  //tabs
const tabs = document.querySelectorAll('.tabheader__item'),
      tabsContent = document.querySelectorAll('.tabcontent'),
      tabsParent = document.querySelector('.tabheader__items');
      function hideTabContent(){
        tabsContent.forEach((item) =>{
          item.classList.add('hide');
          item.classList.remove('show' , "fade");
        });
        tabs.forEach((item) =>{
        item.classList.remove("tabheader__item_active");
        });
      }
      function showTabContent(i = 0){
        tabsContent[i].classList.add("show" , "fade");
        tabsContent[i].classList.remove("hide");
        tabs[i].classList.add("tabheader__item_active");
      }

      hideTabContent();
      showTabContent();  
      tabsParent.addEventListener('click' , (e) =>{
      let target = e.target;
      if(target && target.classList.contains("tabheader__item")){
        tabs.forEach((item,i) =>{
         if( target == item ){
         hideTabContent();
         showTabContent(i);
         }
        });
      } 
      });
     

      //timer
     const deadLine = "2022-08-30";
     function getTimeRemaining(endtime){
      let day,hours,minutes,seconds;
      const t = Date.parse(endtime) - Date.parse(new Date());    
            if( t <= 0){
              day = 0;
              hours = 0;
              minutes = 0;
              seconds = 0;
            } else{
              day = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor( (t / 1000 / 60) % 60),
              seconds = Math.floor( (t /  1000 ) % 60);
            }
            return {
              'total':t,
              'days':day,
              'hours':hours,
              'minutes':minutes,
              'seconds':seconds
             };
     }
    function getZero(num){
      if( num >= 0 && num < 10){
        return `0${num}`;
      } else{
        return num;
      }
    }


     function setClock(selector , endtime){
      const timer = document.querySelector('.timer'),
             days = timer.querySelector("#days"),
             hours = timer.querySelector("#hours"),
             minutes = timer.querySelector("#minutes"),
             seconds = timer.querySelector("#seconds"),
             timeInterval = setInterval(updateClock, 1000);
             updateClock(); // чтобы цифры с верстки не были видны
             //upload timer every seconds
             function updateClock(){
              const t = getTimeRemaining(endtime);
              days.innerHTML = getZero(t.days);
              hours.innerHTML = getZero(t.hours);
              minutes.innerHTML = getZero(t.minutes);
              seconds.innerHTML = getZero(t.seconds);
              if(t.total <= 0){
                clearInterval(timeInterval);
              }
             }
     }
     setClock('.timer' , deadLine);

     //modal
     
     const modalTrigger = document.querySelectorAll("[data-modal]"),
           modal = document.querySelector('.modal'),
           modalCloseBtn = document.querySelector('[data-close]');
  
    function openModal(){
      modal.classList.add("show");
      modal.classList.remove("hide");
      document.body.style.overflow = "hidden";
      clearInterval(modalTimerId);
    }
    modalTrigger.forEach(btn =>{
      btn.addEventListener('click',openModal);
    });


    function closeModal(){
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "scroll";
    };
    modalCloseBtn.addEventListener("click", closeModal); 

    modal.addEventListener("click" ,(e) =>{
      if (e.target == modal){
            closeModal();
          }
         });


        document.addEventListener('keydown', (e)=>{
         if(e.code == "Escape" && modal.classList.contains("show")){
          closeModal();
         }
        });
        
        // const modalTimerId = setTimeout(openModal,5000);

        function showModalByScroll(){
          //Долистал до конца
          if ( window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal();
            window.removeEventListener('scroll' , showModalByScroll);
          }
        }



        window.addEventListener('scroll', showModalByScroll);

    //Используем классы для карточек

      class MenuCard {
        //принимает содержимое карточек
        constructor(src,alt,title,descr,price,parentSelector, ...classes){
          this.src = src;
          this.alt = alt;
          this.title = title;
          this.descr = descr;
          this.price = price;
          this.classes = classes;
          this.parent = document.querySelector(parentSelector);
          this.tranfer = 27;
          this.changeToUAH();
        }
        //гривины в доллары переводит
        changeToUAH(){
          this.price = this.price * this.tranfer;
        }
        //формирует верстку
        render(){
        const element = document.createElement('div');
        if(this.classes.length == 0){
        this.defaultClass = 'menu__item';
        element.classList.add(this.defaultClass);
        }
        else{
          this.classes.forEach(className => element.classList.add(className));
        }
        element.innerHTML+=`              
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>`;
          this.parent.append(element);
        }
      }

      //Если нам нужно использовать объект один раз
      //Мы можем не создавать переменную для неё

      new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
  '      Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
      ).render();




      new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
     '   В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!' , 
        9,
        '.menu .container',
        
      ).render();

      new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
  '     Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ',
        9,
        '.menu .container',
        
      ).render();























});







