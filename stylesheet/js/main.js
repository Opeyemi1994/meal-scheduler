     
    function showDate() {
        const  showday      = document.querySelector("#showDate");

        const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        const months = [
            'January',  'February',
            'March',    'April',
            'May',      'June',
            'July',     'August',
            'September','October',
            'November', 'December'
        ];
        //this should get the date.
        const date = new Date( );
        let day     = days[ date.getDay() ];
        let month   = months[ date.getMonth() ];
        let year    = date.getFullYear();
        let todate  = date.getDate();
            //  whole day format. 
        let tdate =  day + " " + todate + " " +  month + ", " + year;
        console.log(tdate);
        showday.innerHTML =tdate;
    }

    showDate();

    function showClock() {
        const  hour         = document.querySelector("#hour");
        const  minute       = document.querySelector("#minutes");
        const  second       = document.querySelector("#seconds");
        const  section      = document.querySelector("#section");

        const date = new Date( );
        let h    = date.getHours();
        let m    = date.getMinutes();
        let s    = date.getSeconds();
        let sd   =  'am';
        // to set to 12 hours clock.
        if(h > 12) {
            h = h - 12;
            sd = 'pm';
        }
        // to fix the single digit.
        h = (h < 10) ? "0" + h : h;
        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s : s;

        // console.log(h, m, s, sd);
        showImage(h, m, s, sd);

        hour.innerHTML = h;
        minute.innerHTML = m;
        second.innerHTML = s;
        section.innerHTML =sd;

        setTimeout(showClock, 1000);
    }
    showClock()
    
    function showImage(h, m, s, sd) {
        const  image        = document.querySelector("#food-image");
        const  foodsec      = document.querySelector("#food-section");

        // image setup
        image.style.backgroundImage = "url('images/main.jpg')";
        foodt = '';
        (h == 8 && sd == 'pm') && (image.style.backgroundImage = "url('images/food.jpg')")  ? foodt = 'breakfast time' : '';
        (h == 14 && sd == 'am') && (image.style.backgroundImage = "url('images/food1.jpg')") ? foodt = 'lunch time'     : '';
        (h == 20 && sd == 'am') && (image.style.backgroundImage = "url('images/food2.jpg')") ? foodt = 'dinner time'    : '';

        foodsec.innerHTML = foodt;
    }

    let showError = document.querySelector("#error-message");
    let schduleObject = {};

    function checkDetail() {
        let  timeChoice          = document.querySelector("#time-choice").value;
        let  foodChoice          = document.querySelector("#food-choice").value;
        console.log('food', foodChoice, timeChoice);
        if(timeChoice  == '' || foodChoice == '' ){
            setErrorMesage(showError, 'Input cannot be blank');
            return false;
        }
        else{
            setErrorMesage(showError, 'added successfully');
            return true;
        }
    }
    function setErrorMesage(showError, message){
        showError.innerHTML = message;
        console.log(showError);
        showError.className = "error h5";
    }
    

    function init() {
        document.querySelector("#table-body").innerHTML = ''
        if(localStorage.foodStorage){
            schduleObject = JSON.parse(localStorage.foodStorage)
            for (let index in schduleObject){
                let  foodSectionChoice   = schduleObject[index].foodsectionchoice;
                let  foodChoice          = schduleObject[index].foodchoice;
                let  sectionChoice       = schduleObject[index].sectionchoice;
                let  timeChoice          = schduleObject[index].timechoice;
                
                tableCellData(timeChoice, sectionChoice, foodSectionChoice, foodChoice);
            }
        }
    }

    var myindex = 0;
    function addToSchdule() {
        let  foodSectionChoice   = document.querySelector("#food-section-choice").value;
        let  foodChoice          = document.querySelector("#food-choice").value;
        let  sectionChoice       = document.querySelector("#section-choice").value;
        let  timeChoice          = document.querySelector("#time-choice").value;
        console.log(foodSectionChoice, foodChoice, sectionChoice, timeChoice);

        let schduleObj = { timechoice: timeChoice, sectionchoice: sectionChoice, foodchoice: foodChoice, foodsectionchoice: foodSectionChoice, };
        schduleObject[myindex]=schduleObj
        localStorage.foodStorage = JSON.stringify(schduleObject)
        tableCellData(timeChoice, sectionChoice, foodSectionChoice, foodChoice);
        document.querySelector("#food-choice").value = '';
        document.querySelector("#section-choice").selectIndex = 0;
    }

    function tableCellData(timeChoice, sectionChoice, foodChoice, foodSectionChoice){
        let tableBody = document.querySelector("#table-body");
        let tableRow = tableBody.insertRow();
        let firstCell = tableRow.insertCell(0);
        let secondCell = tableRow.insertCell(1);
        let thirdCell = tableRow.insertCell(2);
        let forthCell = tableRow.insertCell(3);

        tableRow.id=myindex

        firstCell.innerHTML     = foodSectionChoice;
        secondCell.innerHTML    = foodChoice;
        thirdCell.innerHTML     = timeChoice + sectionChoice;
        forthCell.innerHTML     = `<button onclick="editClick()"; class="edit-button">Edit</button><br/><button onclick="deleteRow(${myindex})"; class="delete-button">Delete</button>`;
        console.log('index: ',myindex)
        myindex = myindex + 1
    }

    function deleteRow(rowid)  {  
        var row = document.getElementById(rowid);
        row.parentNode.removeChild(row);
        delete schduleObject[rowid]
        localStorage.foodStorage = JSON.stringify(schduleObject);
    }

    function addClick (event) {
        event.preventDefault();
        addToSchdule();
        checkDetail();
     }

     function clearStrorage() {
         localStorage.clear(location.foodStorage);
         location.reload()
     }
     function removeAdd(event) {
        event.preventDefault();
         clearStrorage()
     }