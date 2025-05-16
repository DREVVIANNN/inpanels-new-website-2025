document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.addEventListener('contextmenu', e => e.preventDefault());
    });
  });

  window.onload = function() {
    const hamburger = document.getElementById('hamburger');
    const sideMenu = document.getElementById('sideMenu');
    const content = document.getElementById('content');
  
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      sideMenu.classList.toggle('active');
    });
  
    
      hamburger.classList.remove('active');
      sideMenu.classList.remove('active');
    };

    const firebaseConfig = {
      apiKey: "AIzaSyBY54WfX5xhYzlmOjDPDWhDn1vl3FH3u50",
      authDomain: "inpanels-game.firebaseapp.com",
      projectId: "inpanels-game",
      storageBucket: "inpanels-game.firebasestorage.app",
      messagingSenderId: "650159717173",
      appId: "1:650159717173:web:08c41c28aca9a2e69c6a7c"
    };
  
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();


  document.querySelectorAll(".btn-container").forEach((wrap) => {
    const postId = wrap.getAttribute("data-post-id");
    const btn = wrap.querySelector(".like-btn");
    const countSpan = wrap.querySelector(".like-count");
    const docRef = db.collection("likes").doc(postId);

    let hasLiked = localStorage.getItem(`hasLiked_${postId}`) === "true";

    function updateButtonUI() {
      btn.innerHTML = hasLiked
        ? '<i class="ri-heart-fill"></i>'
        : '<i class="ri-heart-line"></i>';
    }

    function loadLikeCount() {
      docRef.get().then((doc) => {
        if (doc.exists) {
          const count = doc.data().count || 0;
          countSpan.textContent = count;
        } else {
          docRef.set({ count: 0 });
          countSpan.textContent = 0;
        }
        updateButtonUI();
      }).catch((err) => {
        console.error(`❌ Error loading ${postId}:`, err);
      });
    }

    btn.addEventListener("click", () => {
      docRef.get().then((doc) => {
        if (!doc.exists) return;

        let count = doc.data().count || 0;

        if (hasLiked) {
          count = Math.max(0, count - 1);
          localStorage.setItem(`hasLiked_${postId}`, "false");
        } else {
          count += 1;
          localStorage.setItem(`hasLiked_${postId}`, "true");
        }

        hasLiked = !hasLiked;

        docRef.update({ count }).then(() => {
          countSpan.textContent = count;
          updateButtonUI();
        });
      });
    });

    loadLikeCount();
  });

  function onDevelopment() {
    alert("disabled for a while...")
  }

// Define the messages and URLs to be shared
const shareData1 = {
    message: 'Official InPanels Website/Post 1',
    url: 'https://www.inpanels.site'
};

const shareData2 = {
    message: 'Official InPanels Website/Post 2',
    url: 'https://www.inpanels.site'
};

const shareData3 = {
    message: 'Official InPanels Website/Post 3',
    url: 'https://www.inpanels.site'
};

const shareData4 = {
    message: 'Official InPanels Website/Post 4',
    url: 'https://www.inpanels.site'
};

const shareData5 = {
    message: 'Official InPanels Website/Post 5',
    url: 'https://www.inpanels.site'
};

// Function to share on WhatsApp
function shareToWhatsApp(message, url) {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}%20${encodeURIComponent(url)}`;
    window.open(whatsappUrl, '_blank');
}

// Attach event listeners to each button
document.getElementById('shareButtonWhatsApp1').addEventListener('click', function() {
    shareToWhatsApp(shareData1.message, shareData1.url);
});

document.getElementById('shareButtonWhatsApp2').addEventListener('click', function() {
    shareToWhatsApp(shareData2.message, shareData2.url);
});

document.getElementById('shareButtonWhatsApp3').addEventListener('click', function() {
    shareToWhatsApp(shareData3.message, shareData3.url);
});

document.getElementById('shareButtonWhatsApp4').addEventListener('click', function() {
    shareToWhatsApp(shareData4.message, shareData4.url);
});

document.getElementById('shareButtonWhatsApp5').addEventListener('click', function() {
    shareToWhatsApp(shareData5.message, shareData5.url);
});


const sheet = document.getElementById('bottomSheet');

function openSheet() {
  sheet.classList.add('active');
}

function closeSheet() {
  sheet.classList.remove('active');
}