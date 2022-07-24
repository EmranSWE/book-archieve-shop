//Search Button
function searchButton() {
    const searchField=document.getElementById('search-field');
    const searchValue=searchField.value;
    document.getElementById('waiting').style.display='block';
    loadData(searchValue)
    searchField.value=' ';
}

//Load Data From API
const loadData=(value)=>{
//Fetch the value
    const url=`https://openlibrary.org/search.json?q=${value}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayData(data)) 
}

//Display Data On The UI
const displayData=(data)=>{
    const totalContent=data.numFound;
    if(totalContent==0){
        const addDetails=document.getElementById('found-details');
        addDetails.textContent=''
        const div=document.createElement('div');
        div.innerHTML= `
        <h1 class="text-5xl text-blue-500 text-center font-bold">Total Books: ${data.numFound} </h1>
        <h1 class="text-5xl text-blue-500 text-center font-bold">Please Try Again! </h1>
        `;
        addDetails.appendChild(div)
    }
    else{
        const addDetails=document.getElementById('found-details');
        addDetails.textContent=''
        const div=document.createElement('div');
        div.innerHTML= `
        <h1 class="text-5xl text-blue-500 text-center font-bold">Total Books: ${data.numFound} </h1>
        `;
        addDetails.appendChild(div)
    }

    const addBooks=document.getElementById('book');
    addBooks.textContent='';
    const books=data.docs;
    books.forEach(book => {
      //Getting The book cover
        const getCover= displayCover(book.cover_i);
       if(getCover=='noCover'){
       }
       else{
        const div=document.createElement('div');
        div.classList.add('bg-indigo-200');
        div.classList.add('rounded-md');
        div.innerHTML=
        `
        <div class="text-center text-xl ">
        <p class="">Author Name:${book.author_name}</p>
        <p>Tite: ${book.title_suggest}</p>
        <p>First Publish Year:${book.first_publish_year}</p>
        <p>Publisher: ${book.publisher? book.publisher:''}</p>
        <p>Subject: ${book.subject ? book.subject.splice(1,50):''}</p>
        <div class="flex justify-center">
        <div class="w-50"><img  src="${getCover}" alt=""></div>
        </div>
         </div>
     
        
        `;
        addBooks.appendChild(div)
       }
    });
    document.getElementById('waiting').style.display='none';
};

//Cover picture
const displayCover=(coverId)=>{   
    if(coverId === undefined){
        const noCover='noCover'
       return noCover;
    }
    else{
        const url=` https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
        return url;
    } 
}
