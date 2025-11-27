document.addEventListener('DOMContentLoaded', (event) => {

    //Завдання 1
    const block4 = document.getElementById('page_menu');
    const block5 = document.getElementById('contacts');
    
    if (block4 && block5) {
        const tempContainer = document.createElement('div');
        const block4Content = block4.cloneNode(true); 
        block4.innerHTML = ''; 
        block4.innerHTML = block5.innerHTML;
        block5.innerHTML = ''; 
        block5.innerHTML = block4Content.innerHTML;
    }


    //Завдання 2
    const base = 10; 
    const height = 15; 
    
    function calculateTriangleArea(a, h) {
        return 0.5 * a * h;
    }
    const areaResult = calculateTriangleArea(base, height);
    const resultElement = document.createElement('div');
    resultElement.style.marginTop = '10px';
    resultElement.style.padding = '10px';
    resultElement.style.borderTop = '2px dashed #8F4A2B';
    resultElement.style.fontSize = '1.1em';
    resultElement.style.fontFamily = 'Arial, sans-serif';
    resultElement.innerHTML = `
        <h3>Завдання: Обчислення площі</h3>
        <p>Основа = ${base}, Висота = ${height}</p>
        <p><strong>Площа трикутника = ${areaResult}</strong></p>
    `;

    const block3 = document.getElementById('menu');
    if (block3) {
        block3.appendChild(resultElement);
    }


    //Завдання 3
    
    const COOKIE_NAME = 'minCountResult';
    const LOCAL_STORAGE_KEY = 'menuTextColor';
    const formContainer = document.getElementById('min-count-task');
    const numberForm = document.getElementById('numberForm');

    
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/; SameSite=Lax"; 
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function eraseCookie(name) {
        document.cookie = name + '=; Max-Age=-99999999; path=/';
    }

    function calculateMinCount(event) {
        event.preventDefault(); 
        if (!numberForm) return;

        const inputs = Array.from(numberForm.querySelectorAll('.num-input'));
        const numbers = inputs.map(input => parseFloat(input.value)).filter(n => !isNaN(n));
        
        if (numbers.length !== 10) {
            alert("Будь ласка, введіть 10 коректних числових значень.");
            return;
        }

        const min = Math.min(...numbers);
        let count = 0;
        numbers.forEach(num => {
            if (num === min) {
                count++;
            }
        });

        const resultText = `Мінімальне число: ${min}. Кількість мінімальних чисел: ${count}.`;
        
        alert(resultText); 

        setCookie(COOKIE_NAME, encodeURIComponent(resultText), 1);
        
        window.location.reload();
    }
    
    function handlePageLoad() {
        const rawStoredResult = getCookie(COOKIE_NAME);
        
        if (rawStoredResult) {
            const storedResult = decodeURIComponent(rawStoredResult);

            if (formContainer) {
                formContainer.style.display = 'none'; 
            }
            
            const userChoice = confirm(
                `Збережений результат:\n\n${storedResult}\n\nНатисніть 'ОК', щоб видалити ці дані із cookies та перезавантажити сторінку.`
            );

            if (userChoice) {
                eraseCookie(COOKIE_NAME);
                
                alert("Дані із cookies успішно видалено!");
                
                window.location.reload(); 
            }
        } else {
            if (formContainer) {
                formContainer.style.display = 'block';
            }
        }
    }
    
    if (numberForm) {
        numberForm.addEventListener('submit', calculateMinCount);
    }
    
    handlePageLoad();




    //Завдання 4

    const menuBlock = document.getElementById('menu'); 
    const colorKey = 'menuTextColor';
    let storedColor = localStorage.getItem(colorKey);
    let finalColor; 

    if (storedColor) {
        finalColor = storedColor;
    } else {
        let newColor = prompt(
            "Введіть бажаний колір тексту для блоку 'Меню' (наприклад: red, #00FF00):",
            "darkviolet"
        );
        if (newColor) {
            finalColor = newColor;
            localStorage.setItem(colorKey, newColor);
        } else {
            finalColor = '#333'; 
        }
    }
    
    if (menuBlock && finalColor) {
        menuBlock.style.color = finalColor;
        const prices = menuBlock.querySelectorAll('.price');
        prices.forEach(price => {
            price.style.color = finalColor; 
        });
    }

    
    //Завдання 5 

    const LIST_STORAGE_PREFIX = 'dynamicList_'; 
    const DBLCLICK_TARGETS = document.querySelectorAll('.js-dblclick-target'); 
   
    function createListForm(targetElement) {
        
        const originalContent = targetElement.innerHTML;
        const storageKey = LIST_STORAGE_PREFIX + targetElement.id;
        targetElement.innerHTML = '';
        
        const formContainer = document.createElement('div');
        formContainer.style.padding = '15px';
        formContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        formContainer.style.borderRadius = '10px';
        
        formContainer.innerHTML = `
            <h4>Створення списку в блоці #${targetElement.id}</h4>
            <ul id="dynamicList" style="list-style-type: disc; margin: 10px 0 15px 25px;"></ul>
            <input type="text" id="listItemInput" placeholder="Новий пункт..." style="padding: 5px; width: 60%; margin-right: 10px;">
            <button id="addItemBtn" type="button">Додати пункт</button>
            <button id="saveListBtn" type="button" style="background-color: #8FBC8F; color: white; margin-top: 10px;">Зберегти список</button>
        `;

        targetElement.appendChild(formContainer);

        const list = document.getElementById('dynamicList');
        const input = document.getElementById('listItemInput');
        const saveBtn = document.getElementById('saveListBtn');
        const addBtn = document.getElementById('addItemBtn');

        addBtn.addEventListener('click', () => {
            const text = input.value.trim();
            if (text) {
                const li = document.createElement('li');
                li.textContent = text;
                list.appendChild(li);
                input.value = '';
                input.focus();
            }
        });
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addBtn.click();
            }
        });

        saveBtn.addEventListener('click', () => {
            const listItems = Array.from(list.children).map(li => li.textContent);
            
            if (listItems.length === 0) {
                alert("Список порожній. Нічого не збережено.");
                return;
            }

            localStorage.setItem(storageKey, JSON.stringify(listItems));
            
            targetElement.innerHTML = '';
            targetElement.appendChild(list);
            
            alert(`Список збережено в localStorage під ключем: ${storageKey}`);
        });

        targetElement.dataset.originalContent = originalContent;
    }

    DBLCLICK_TARGETS.forEach(block => {
        block.addEventListener('dblclick', function() {
             if (!this.querySelector('#dynamicList')) {
                 createListForm(this);
             }
        });
    });

    function handleListCleanup() {
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith(LIST_STORAGE_PREFIX)) {
                keysToRemove.push(key);
            }
        }

        if (keysToRemove.length > 0) {
             keysToRemove.forEach(key => {
                 localStorage.removeItem(key);
                 console.log(`Видалено динамічний список з localStorage: ${key}`);
             });
        }
    }
    
    handleListCleanup(); 


});
