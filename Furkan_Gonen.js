(async function () {
  // Verileri almak için get fonksiyonu
  const getProducts = async () => {
    const localData = localStorage.getItem("products");
    if (localData) {
      return JSON.parse(localData);
    } else {
      const response = await fetch(
        "https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json"
      );
      const data = await response.json();
      localStorage.setItem("products", JSON.stringify(data));
      return data;
    }
  };

  // Dinamik olarak product-detail div'ini oluşturuyoruz const
  createProductDetailDiv = () => {
    const productDetailDiv = document.createElement("div");
    productDetailDiv.className = "product-detail"; //
    document.body.appendChild(productDetailDiv);
  };

  const buildHTML = (products) => {
    createProductDetailDiv();
    const container = document.createElement("div");
    container.className = "carousel-container";
    container.innerHTML = ` 
      <h3>You Might Also Like</h3>
      <div class="carousel-wrapper">
        <button class="carousel-btn left-btn">&lt;</button>
        <div class="carousel">
          ${products
            .map(
              (product) => ` 
            <div class="carousel-item" data-id="${product.id}">
              <a href="${product.url}" target="_blank" class="product-link">
                <div class="product-info">
                  <div class="image-wrapper">
                    <img src="${product.img}" alt="${product.name}">
                    <div class="favorite">&hearts;</div>
                  </div>
                  <p class="product-name">${product.name}</p>
                  <p class="product-price">${product.price} TRY</p>
                </div>
              </a>
            </div>`
            )
            .join("")}
        </div>
        <button class="carousel-btn right-btn">&gt;</button>
      </div>
    `;

    // Elemanı bul ve sonrasına ekle
    const productDetail = document.querySelector(".product-detail");
    if (productDetail) {
      productDetail.after(container);
    } else {
      console.error(
        'Hata: ".product-detail" class not found, check function for creation of .product-detail class.'
      );
    }

    // Favori ikonlarını doğru pozisyonda sağ üst köşeye yerleştirme
    const favoriteIcons = container.querySelectorAll(".favorite");
    favoriteIcons.forEach((icon) => {
      const carouselItem = icon.closest(".carousel-item");
      carouselItem.style.position = "relative";
      icon.style.position = "absolute";
      icon.style.top = "10px";
      icon.style.right = "10px";
      icon.style.cursor = "pointer";
      icon.style.fontSize = "40px";
    });
  };

  const buildCSS = () => {
    const css = `
    /* Carousel Container */
    .carousel-container {
      width: 100%;
      background-color: white;
      z-index: 1000;
      padding: 10px 0;
      box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
    }
    
    /* Carousel Wrapper */
    .carousel-wrapper {
      display: flex;
      overflow: hidden;
      position: relative;
      width: 100%;
      justify-content: flex-start; 
    }
    
    /* Carousel */
    .carousel {
      display: flex;
      transition: transform 0.6s ease-in-out; 
    }
    
    /* Carousel Item */
    .carousel-item {
      padding: 10px;
      width: 100%;
      box-sizing: border-box;
      flex: 0 0 13.5%; /*6 and half prdocuts will be seen */
      position: relative; 
      display: flex;
      flex-direction: column;
      align-items: center; 
      justify-content: space-between; 
      text-align: center; 
      margin: 15px;
    }
    
    /* Image wrapper */
    .image-wrapper {
      position: relative; 
    }
    
    .image-wrapper img {
      width: 100%;
      border: 0.1px transparent black;
      border-radius: 8px;
      object-fit: contain; 
    }
    
    /* Favori Ikonu */
    .favorite {
      position: absolute; 
      top: 10px; 
      right: 10px; 
      font-size: 40px; 
      cursor: pointer; 
      color: grey;
    }
    
    .favorite.favorited {
      color: #0056b3;
    }
    
   /* Carousel Buttons */
   .carousel-btn {
      position: absolute;
      top: 45%; 
      transform: translateY(-50%);
      background-color: rgba(0, 0, 0, 0.6);
      color: white;
      border: none;
      font-size: 30px;
      padding: 12px;
      cursor: pointer;
      z-index: 1001;
      border-radius: 20%; 
      transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease; /* Geçiş efektleri */
      box-shadow: 0 0 15px rgba(45, 44, 44, 0.2); 
}

  .carousel-btn:hover {
    background-color: rgba(0, 0, 0, 0.8); 
    transform: translateY(-50%) scale(1.1); 
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.4); 
  }

  .left-btn {
    left: 10px;
  } 

  .right-btn {
   right: 10px;
  }

  
 a{
  text-decoration: none;
}
    
  /* Product Name Styles */
.product-name {
  font-size: 18px; 
  font-weight: 600; 
  color: #666;
  transition: color 0.3s ease; 
}


.product-name:hover {
  color: #007bff;
}
    .product-price {
      font-size: 16px;
      font-weight: 500;
      color: #007bff;
      transition: color 0.3s ease;
    }
    
    .product-price:hover {
      color: #0056b3; /* Hover'da fiyatın rengi değişiyor */
    }
    
    /* Header Style */
    h3 {
      font-family: 'Verdana', sans-serif;
      font-size: 32px;
      font-weight: 900; 
      text-align: center;
      margin-bottom: 25px;
      color: #2c3e50;
      text-transform: uppercase;
      letter-spacing: 2px; 
    }
    
    /* Notification Message */
    .notification {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #28a745;
      color: white;
      padding: 15px;
      border-radius: 10px;
      font-size: 16px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 10000;
      cursor: pointer;
    }
    
    .notification.show {
      opacity: 1;
    }
      }
    `;

    // Style tagini oluştur ve stil kodlarını içine ekle
    const style = document.createElement("style");
    style.innerHTML = css;

    // Head kısmına ekle
    document.head.appendChild(style);
  };

  const loadFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites.forEach((id) => {
      document
        .querySelector(`.carousel-item[data-id="${id}"] .favorite`)
        .classList.add("favorited");
    });
  };

  const updateFavorites = (id, isFavorited, productName, productPrice) => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorited) {
      if (!favorites.includes(id)) favorites.push(id);
    } else {
      const index = favorites.indexOf(id);
      if (index > -1) favorites.splice(index, 1);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));

    // Favori durumuna göre farklı bildirimler göster
    if (isFavorited) {
      // Favoriye ekleme durumunda bildirim göster
      showNotification(productName, productPrice, "eklendi");
    } else {
      // Favorilerden çıkarıldığında bildirim göster
      showNotification(productName, productPrice, "çıkarıldı");
    }
  };

  const showNotification = (productName, productPrice, messageType) => {
    const notification = document.createElement("div");
    notification.classList.add("notification");

    let message = "";
    if (messageType === "eklendi") {
      message = `${productName} ürün sepetinize eklenildi fiyat: ${productPrice} TRY!`;
    } else if (messageType === "çıkarıldı") {
      message = `${productName} ürün favorilerden çıkarıldı.`;
    }

    notification.innerHTML = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("show");
    }, 100); // Show the notification immediately

    notification.addEventListener("click", () => {
      notification.classList.remove("show");
      setTimeout(() => {
        notification.remove();
      }, 300); // Wait for the fade-out to finish
    });

    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000); // Hide after 3 seconds
  };

  const setEvents = () => {
    document.querySelector(".carousel").addEventListener("click", (e) => {
      const favorite = e.target.closest(".favorite");
      if (!favorite) return;

      const productId = favorite.closest(".carousel-item").dataset.id;
      const productName = favorite
        .closest(".carousel-item")
        .querySelector(".product-name").textContent;
      const productPrice = favorite
        .closest(".carousel-item")
        .querySelector(".product-price").textContent;

      const isFavorited = favorite.classList.contains("favorited");

      // Favori durumunu toggle et
      favorite.classList.toggle("favorited");

      // Favori durumuna göre favoriler listesini güncelle
      updateFavorites(
        productId,
        !isFavorited, // Favoriye ekleme durumu
        productName,
        productPrice
      );

      // Eğer favoriye eklenmişse mesajı göster
      if (!isFavorited) {
        showNotification(productName, productPrice, "eklendi");
      }

      e.preventDefault(); // Yönlendirmeyi engelle
    });

    let scrollPosition = 0;
    const carousel = document.querySelector(".carousel");
    const wrapper = document.querySelector(".carousel-wrapper");

    const updateWrapperWidth = () => {
      const itemsPerSlide =
        window.innerWidth >= 1024 ? 6.5 : window.innerWidth >= 768 ? 4 : 3;
      wrapper.style.setProperty("--items-per-slide", itemsPerSlide);
    };
    updateWrapperWidth();

    window.addEventListener("resize", updateWrapperWidth);
    const items = document.querySelectorAll(".carousel-item");
    const itemWidth =
      items[0].offsetWidth +
      parseInt(getComputedStyle(items[0]).marginRight) +
      15; // for margin we added 15 px as well;

    console.log(itemWidth);
    // Sağ buton tıklama işlemi
    document.querySelector(".right-btn").addEventListener("click", () => {
      const maxScroll = -(carousel.scrollWidth - wrapper.offsetWidth);
      scrollPosition = Math.max(scrollPosition - itemWidth, maxScroll);
      carousel.style.transform = `translateX(${scrollPosition}px)`;
    });

    // Sol buton tıklama işlemi
    document.querySelector(".left-btn").addEventListener("click", () => {
      scrollPosition = Math.min(scrollPosition + itemWidth, 0);
      carousel.style.transform = `translateX(${scrollPosition}px)`;
    });
  };

  const init = async () => {
    const products = await getProducts();
    buildHTML(products);
    buildCSS();
    setEvents();
    loadFavorites();
  };

  init();
})();
