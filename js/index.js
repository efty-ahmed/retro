let readCount = 0; // Counter for "Mark as read"

// Load cards from API
const loadcard = async () => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
        const data = await res.json();
        const cards = data.posts;
        displayCards(cards);
    } catch (error) {
        console.error("Error loading cards:", error);
    }
}

// Display cards
const displayCards = (cards) => {
    const cardContainer = document.getElementById('card_container');
    cardContainer.innerHTML = ''; 

    cards.forEach(card => {
        const cardCard = document.createElement('div');
        cardCard.classList = `card card-side bg-base-100 shadow-xl`;

        // Card HTML structure 
        cardCard.innerHTML = `
            <div class="card bg-base-100 shadow-xl flex flex-col md:flex-row items-start p-6"> 
        <figure class="flex-shrink-0 relative">
            <img class="h-20 md:h-32 rounded-xl" src="${card.image}" alt="Movie" /> <!-- Adjust image height -->
            <span class="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
        </figure>
        <div class="card-body p-0 mt-4 md:mt-0 md:ml-4"> 
            <div class="flex text-gray-400 space-x-4">
                <p>#${card.category}</p>
                <p>Author: ${card.author.name}</p>
            </div>
            <h2 class="card-title">${card.title}</h2>
            <p class="border-dashed border-b-2 border-sky-500 pb-5">
                It’s one thing to subject yourself to ha Halloween costume mishap because, <br> hey that’s your prerogative
            </p>
            <div class="space-x-6 pt-5">
                <i class="fa-regular fa-message"></i> ${card.comment_count}
                <i class="fa-regular fa-eye"></i> ${card.view_count}
                <i class="fa-regular fa-clock"></i> ${card.posted_time}
            </div>
            <div class="card-actions justify-end">
                <button class="btn btn-outline border-none rounded-full btn-success" 
                        onclick="updateDynamicBar('${card.title}', ${card.view_count})">
                    <i class="fa-solid fa-envelope-open"></i>
                </button>
            </div>
        </div>
    </div>
        `;
        
        // Append card to container
        cardContainer.appendChild(cardCard);
    });
}

// Function to update dynamic bar with title and view count
const updateDynamicBar = (title, viewCount) => {
    const dynamicBarContent = document.getElementById('dynamic-bar-content');
    const markAsReadCounter = document.getElementById('mark-as-read');

    // Create new item for the title and view count
    const newItem = document.createElement('div');
    newItem.classList = 'flex justify-between border-double border-b-4 border-sky-500   py-4';
    newItem.innerHTML = `
        <span>${title}</span>
        <span><i class="fa-regular fa-eye"></i></span>
        <span>${viewCount}</span>
    `;
    
    // Append new item to dynamic bar content area
    dynamicBarContent.appendChild(newItem);

    // Update read count and display
    readCount += 1;
    markAsReadCounter.textContent = `Mark as read (${readCount})`;
}

loadcard();

//handle search btn
//----------------------->>>>>>
window.addEventListener("load", function () {
    // Hide loader when page is fully loaded
    document.getElementById("loader").classList.add("hidden");
  });
  
  window.addEventListener("beforeunload", function () {
    // Show loader when page is about to unload
    document.getElementById("loader").classList.remove("hidden");
  });

  //--------------------------->>>>>>

//all post-------------
const loadPostContent = async ()=>{
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    const postsInfo = (data);
    // console.log(postsInfo);
displayPosts(postsInfo)

}

// display posts--->
const displayPosts = (postsInfo) =>{
const letestPostContent = document.getElementById('letest_post_content');

postsInfo.forEach(postInfo => {
    const postCard = document.createElement('div');
    postCard.classList = `card bg-base-100 w-96 shadow-xl mb-5 md:mb-0`;

    //inner html--->
    postCard.innerHTML = `
       <figure>
                    <img src="${postInfo.cover_image}" alt="Shoes" />
                </figure>
                <div class="card-body">
                <p class="text-gray-400"><i class="fa-solid fa-calendar-days"></i> ${postInfo.author.posted_date}</p>
                    <h2 class="font-bold text-xl">${postInfo.title}</h2>
                    <p class="text-sm text-gray-400">${postInfo.description}</p>
                    <div class="card-actions">
                       <img class="rounded-full h-10" src="${postInfo.profile_image}" alt="">
                       <div> 
                       <p class="font-bold">${postInfo.author.name}</p>
                       <p class="text-xs text-gray-400">${postInfo.author.designation}</p>
                       </div>
                    </div>
                </div>
    `;
    //appen child

    letestPostContent.appendChild(postCard);
})
}



loadPostContent()