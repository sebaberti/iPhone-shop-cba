const productsData = [
    {
      id:1,
      name: 'Iphone Se',
      price: 400,
      category: 'iphone',
      cardImg: './assets/img/productos/iphone-se-removebg-preview.png',
    },
    {
        id:2,
        name: 'Iphone 14',
        price: 1450,
        category: 'iphone',
        cardImg: './assets/img/productos/iphone-14-gb-removebg-preview.png',
      },
      {
        id:3,
        name: 'Airpods pro',
        price: 400,
        category: 'auricular',
        cardImg: './assets/img/productos/airpods_pro_PDP_US_1-removebg-preview.png',
      },
      {
        id:4,
        name: 'Airpods max',
        price: 111,
        category: 'auricular',
        cardImg: './assets/img/productos/AirPods_Max_Silver_PDP_Image_Position-2__en-US-300x300-removebg-preview.png',
      },
      {
        id:5,
        name: 'Macbook pro 16"',
        price: 555,
        category: 'pc',
        cardImg: './assets/img/productos/macbook-pro-16-mk183-m1-pro-512-gb-space-gray-removebg-preview.png',
      },
     {
      id:6,
      name: 'Macbook pro 13"',
      price: 111,
      category: 'pc',
      cardImg: './assets/img/productos/macbook-air-13pul-removebg-preview.png',
    },
    {
        id:7,
        name: 'Watch series 7',
        price:1231 ,
        category: 'reloj',
        cardImg: './assets/img/productos/apple-watch-serie6-removebg-preview.png',
      },
      {
        id:8,
        name: 'Watch series 6',
        price:121 ,
        category: 'reloj',
        cardImg: './assets/img/productos/apple-watch-serie6-removebg-preview.png',
      },
      {
        id:9,
        name: 'Macbook pro 14"',
        price:1231 ,
        category: 'pc',
        cardImg: './assets/img/productos/copy-of-macbook-pro-14-mkgr3-m1-pro-512-gb-silver-removebg-preview.png',
      },
      {
        id:10,
        name: 'Iphone 11 pro',
        price:111 ,
        category: 'iphone',
        cardImg: './assets/img/productos/iphone11pro-removebg-preview.png',
      },
      {
        id:11,
        name: 'Iphone Xr',
        price: 121,
        category: 'iphone',
        cardImg: './assets/img/productos/iphonexr-removebg-preview.png',
      },
      {
        id:12,
        name: 'Iphone 12',
        price:1231 ,
        category: 'iphone',
        cardImg: './assets/img/productos/iphone12sf.png',
      },
      {
        id:13,
        name: 'Iphone 12 pro',
        price:111 ,
        category: 'iphone',
        cardImg: './assets/img/productos/iPhone-12-Pro-Maxsf.png',
      },
      {
        id:14,
        name: 'Iphone 13',
        price:111 ,
        category: 'iphone',
        cardImg: './assets/img/productos/iphone13-sf.png',
      },
      {
        id:15,
        name: 'Iphone 13 pro max',
        price: 1231,
        category: 'iphone',
        cardImg: './assets/img/productos/iphone13pro-max-varios-sf.png',
      },
      {
        id:16,
        name: 'Iphone 14 pro',
        price: 111,
        category: 'iphone',
        cardImg: './assets/img/productos/iphone-14-pro-5-removebg-preview.png',
      },
      {
        id:17,
        name: 'Airdots 3 generacion',
        price:111 ,
        category: 'auricular',
        cardImg: './assets/img/productos/airdots3generacion-sf.png',
      },
];

 const splitProducts = (size) => {
 	let dividedProducts = [];
 	for (let i = 0; i < productsData.length; i += size) {
 		dividedProducts.push(productsData.slice(i, i + size));
 	}
 	return dividedProducts;
 };

 const productsController = {
 	dividedProducts: splitProducts(8),
 	nextProductsIndex: 1,
 	productsLimit: splitProducts(8).length,
 };



 console.log(productsData);


