const loadPhones = async(search, datalimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
    const res = await fetch(url);
    const data = await res.json();
     displayPhones(data.data, datalimit); 
}


const displayPhones = (phones, datalimit) =>{
    const phoneContainer = document.getElementById('phones-container');
    phoneContainer.textContent = '';

    //Display 10 phones Only
    const showAll = document.getElementById('show-all');
    if(datalimit && phones.length > 10){
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none')
    }
    

    // Display No Phone Found
    const noPhone = document.getElementById('no-phone-found');
    if(phones.length ===0){
        noPhone.classList.remove('d-none');
    }
    else{
        noPhone.classList.add('d-none');
    }

    //Display All Phones
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        // console.log(phone);
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-3">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Model: ${phone.phone_name}</h5>
                <p class="card-text">Brand: ${phone.brand}</p>
                <button onclick="loaddetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneModal">Show Detail </button>
            </div>
      </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    })
    //stop Loader
    toggleSpinner(false);
}

const processSearch = (datalimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, datalimit);
}

//Handle search button click
document.getElementById('btn-search').addEventListener('click', function(){
    processSearch(10);
})

//Search Input Field Enter key handler
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10);
    }
});

const toggleSpinner = isLoading =>{
    const loadersection = document.getElementById('loader');
    if(isLoading){
        loadersection.classList.remove('d-none');
    }
    else{
        loadersection.classList.add('d-none');
    }
}

document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();
})

//Deatils Mobile Phone
 const loaddetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetail(data.data); 
}
    

  const displayPhoneDetail = phone => { 
     console.log(phone);
     const modalTitle = document.getElementById('phoneModallabel');
     modalTitle.innerText = phone.name;
     const phonedetail = document.getElementById('modal-phone-detail');
     phonedetail.innerHTML = `
     <img src="${phone.image}" />
     <p>Brand: ${phone.brand}</p>
     <p>Model: ${phone.slug}</p>
     <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No release date found'}</p>
     <h4>Main feature:</h4>
     <p>Storage: ${phone.mainFeatures.storage}</p>
     <p>DisplaySize: ${phone.mainFeatures.displaySize}</p>
     <p>Memory: ${phone.mainFeatures.memory}</p>
     <p>Blutooth: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth'} </p>
     <p>Wifi: ${phone.others ? phone.others.WLAN : 'No Bluetooth'} </p>
     
     `
}  

//  loadPhones();