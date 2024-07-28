let search = document.querySelector('.search input');
let searchBtn = document.querySelector('.search button');
let profilePicture = document.getElementById('profile-pic');
let name = document.getElementById('name');
let userName = document.getElementById('username');
let followers = document.getElementById('followers');
let following = document.getElementById('following');
let userlocation = document.getElementById('location');
let followBtn = document.querySelector('.follow-btn');
let userDetails = document.querySelector('.user-detail');
let found = document.querySelector('.found');
let notFound = document.querySelector('.not-found');
let input_error = document.querySelector('.input_error')

function getData(){
    if(search.value.trim() == ''){
        input_error.innerHTML = `<p class="error">Please input a profile name</p>`
    }
    else{
        input_error.innerHTML = ''; // Clear any previous error messages
        input_error.innerHTML = `<p>Loading...</p>`;
        fetchData()
    }
    search.value = '';
}


function fetchData(){
    const url = `https://api.github.com/users/${search.value}`;
    console.log(url);
    

    fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error(); // Throws an error if the response status is not OK
            }
            return res.json();
        })
        .then((data) => {
            input_error.innerHTML = '';
            userDetails.classList.add('active');
            notFound.classList.remove('active');
            found.classList.add('active');
            showData(data);
        })
        .catch((err) => {
            userDetails.classList.add('active');
            notFound.classList.add('active');
            found.classList.remove('active');
            input_error.innerHTML = `<p class="error">${err.message}</p>`;
        });
}


function showData(userData){
    profilePicture.src = `${userData.avatar_url}`;
    name.innerText = `${userData.name}`;
    userName.innerText = `${userData.login}`;
    followers.innerText = `${userData.followers} followers`
    following.innerText = `${userData.following} following`
    userlocation.innerText = `${userData.location}`
    followBtn.href = `${userData.html_url}`
}

searchBtn.addEventListener('click',getData);
search.addEventListener('keyup',(e) => {
    if(e.key === "Enter"){
        getData();
    }
})