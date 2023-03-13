// data fetching function
const aiUniverse = async (limit, isShort) => {

    //loader section start
    spinner(true);

    //fetching data url
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    dataLoading(data.data.tools, limit, isShort);

};


//fetching data loading function
const dataLoading = (fetchingData, limit, isShort) =>{
    
    //sorting function
    if(isShort === true){
        fetchingData.sort(custom);
    }

    //card section start
    const cardSection = document.getElementById('cardSection');

    cardSection.textContent = '';

    const seeMore = document.getElementById('seeMore');

    //slice data 6
    if(limit && fetchingData.length > 6){
        //slice items
        fetchingData = fetchingData.slice(0,6);

        seeMore.classList.remove('d-none');
    }else{
        seeMore.classList.add('d-none');
    }
    
    

    //sorting data
    document.getElementById('shortingDate').addEventListener('click', function(){

        aiUniverse(6, true);

        
    })

    //looping data in card
    fetchingData.forEach((loadingData) => {
        
        // div section create
        const div = document.createElement('div');
        div.classList.add('col', 'col-12', 'col-md-4');
        // declare variable
        let num = 1;
        //innerHtml section start
        div.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <div>
                        <img class="w-100" src="${loadingData.image}" alt="${loadingData.name}">
                    </div>
                    
                    <div>
                        <h3 style="font-weight:bold;">Features</h3>
                        <p>${num++}.${loadingData.features[0]}</p>
                        <p>${num++}.${loadingData.features[1]}</p>
                        <p>${num++}.${loadingData.features[2]}</p>
                        <hr>
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h5>${loadingData.name}</h5>
                                <div class="d-flex align-items-center">
                                    <i class='bx bxs-calendar' style="font-size: 25px;"></i>
                                    <span class="ps-1">${loadingData.published_in}</span>
                                </div>
                            </div>
                            <div>
                                <i onclick="showAllData('${loadingData.id}')" class='bx bx-left-arrow-alt bx-rotate-180 bg-danger' data-bs-toggle="modal" data-bs-target="#clickModal" style="font-size: 25px; padding:6px; border-radius: 50px;"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        //append child
        cardSection.appendChild(div);
    });
    //spinner 
    spinner(false);
    
}

//sorting data function 
function custom(a, b) {
    const dateA = new Date(a.published_in);
    const dateB = new Date(b.published_in);
    return dateA - dateB;
}

//showAllData
const showAllData = async (id) => {
    const url = ` https://openapi.programming-hero.com/api/ai/tool/${id}`;

    try{
        const res = await fetch(url);
        const data = await res.json();
        modalDataShow(data.data);
    }catch(error) {
        console.log(error);
    }
}


//modal data show
const modalDataShow = dataShow => {

    const features = Object.values(dataShow.features);


    const modalView = document.getElementById("modalView");
    
    modalView.innerHTML = `
    <div class=" col-md-6 col-12">
        <div class="card h-100 bg-danger-subtle border-danger">
            <div class="card-body ">
                <div>
                <h6>${dataShow.description}</h6>
                </div>

                <div id="price" class="d-flex text-center">
                    <p class="d-inline-block p-2 me-3 bg-light rounded text-success">
                        <span>${dataShow.pricing === null ? 'Free of Cost' : dataShow.pricing[0].price}</span><br>
                        <span>${dataShow.pricing === null ? "/Basic" : dataShow.pricing[0].plan}</span>
                    </p>
                    <p class="d-inline-block p-2 me-3 bg-light rounded text-warning">
                        <span>${dataShow.pricing === null ? 'Free of Cost' : dataShow.pricing[1].price}</span><br>
                        <span>${dataShow.pricing === null ? "/Pro" : dataShow.pricing[1].plan}</span>
                    </p>
                    <p class="d-inline-block p-2 bg-light rounded text-danger">
                        <span>${dataShow.pricing === null ? 'Free of Cost' : dataShow.pricing[2].price}</span><br>
                        <span>${dataShow.pricing === null ? "/Enterprise" : dataShow.pricing[2].plan}</span>
                    </p>
                </div>

                <div class="d-flex">
                    <div class="d-inline-block pe-2">
                        <h6>Features</h6>
                        <ul>
                            ${features.map(feat => {
                                return `<li>${feat.feature_name}</li>`
                            }).join('')}
                        </ul>
                    </div>
                    <div class="d-inline-block">
                        <h6>Integration</h6>
                        <ul>
                            ${dataShow.integrations === null ? 'No data Found' : dataShow.integrations.map( integration => {
                                return `<li>${integration}</li>`
                            }).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class=" col-md-6 col-12">
        <div class="card h-100">
            <div class="card-body" style="position: relative">
                <img src="${dataShow.image_link[0]}" class="w-100">
                <span style="position: absolute; top: 30px; right: 30px;" class="badge text-bg-danger rounded-pill">${dataShow.accuracy.score === null ? '' : dataShow.accuracy.score * 100 + '% accuracy'}</span>
                <div class="text-center">
                    <h4>
                        ${dataShow.input_output_examples === null ? "Can you give any example?" : dataShow.input_output_examples[0].input}
                    </h4>
                    <p>
                        ${dataShow.input_output_examples === null ? "Not Not Yet!! Take a break!!!" : dataShow.input_output_examples[0].output}
                    </p>
                </div>
            </div>
        </div>
    </div>`;

}



//loaderSection start
const spinner = loader => {
    const loaderSection = document.getElementById('loaderSection');

    if(loader){
        loaderSection.classList.remove('d-none');
    }else{
        loaderSection.classList.add('d-none');
    }
}

//showAllDataBtn
document.getElementById('showAllDataBtn').addEventListener('click', function () {

    aiUniverse();


});


aiUniverse(6);



