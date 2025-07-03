const productsData = [
    {
        id: 'product1',
        name: 'تروليات هاوسكيبينج',
        category: 'تروليات هاوسكيبينج',
        image: 'images/catalog_pages/Retaj Cataloug_page-0004.jpg',
        description: 'تروليات هاوسكيبينج عالية الجودة للفنادق والمستشفيات.'
    },
    {
        id: 'product2',
        name: 'تروليات بايليك إيريا',
        category: 'تروليات بايليك إيريا',
        image: 'images/catalog_pages/Retaj Cataloug_page-0005.jpg',
        description: 'تروليات بايليك إيريا متعددة الاستخدامات.'
    },
    {
        id: 'product3',
        name: 'تروليات سيرفيس ترولي',
        category: 'تروليات سيرفيس ترولي',
        image: 'images/catalog_pages/Retaj Cataloug_page-0006.jpg',
        description: 'تروليات سيرفيس ترولي لتقديم الخدمات بكفاءة.'
    },
    {
        id: 'product4',
        name: 'دواسات (ماتس)',
        category: 'دواسات (ماتس)',
        image: 'images/catalog_pages/Retaj Cataloug_page-0002.jpg',
        description: 'دواسات وماتس عالية الجودة لمداخل الفنادق والمستشفيات.'
    },
    {
        id: 'product5',
        name: 'أدوات نظافة',
        category: 'أدوات نظافة',
        image: 'images/catalog_pages/Retaj Cataloug_page-0007.jpg',
        description: 'مجموعة متكاملة من أدوات النظافة الاحترافية.'
    },
    {
        id: 'product6',
        name: 'تروليات نظافة',
        category: 'تروليات نظافة',
        image: 'images/catalog_pages/Retaj Cataloug_page-0008.jpg',
        description: 'تروليات نظافة عملية ومتينة.'
    },
    {
        id: 'product7',
        name: 'كراسي وترابيزات',
        category: 'كراسي وترابيزات',
        image: 'images/catalog_pages/Retaj Cataloug_page-0009.jpg',
        description: 'تشكيلة واسعة من الكراسي والترابيزات.'
    },
    {
        id: 'product8',
        name: 'مستلزمات مطابخ',
        category: 'مستلزمات مطابخ',
        image: 'images/catalog_pages/Retaj Cataloug_page-0003.jpg',
        description: 'مستلزمات مطابخ عالية الجودة للفنادق والمستشفيات.'
    },
    {
        id: 'product9',
        name: 'مستلزمات أطفال',
        category: 'مستلزمات أطفال',
        image: 'images/catalog_pages/Retaj Cataloug_page-0010.jpg',
        description: 'مستلزمات أطفال آمنة ومريحة.'
    },
    {
        id: 'product10',
        name: 'منتجات متنوعة 1',
        category: 'أخرى',
        image: 'images/catalog_pages/Retaj Cataloug_page-0011.jpg',
        description: 'منتجات متنوعة إضافية.'
    },
    {
        id: 'product11',
        name: 'منتجات متنوعة 2',
        category: 'أخرى',
        image: 'images/catalog_pages/Retaj Cataloug_page-0012.jpg',
        description: 'منتجات متنوعة إضافية.'
    },
    {
        id: 'product12',
        name: 'منتجات متنوعة 3',
        category: 'أخرى',
        image: 'images/catalog_pages/Retaj Cataloug_page-0013.jpg',
        description: 'منتجات متنوعة إضافية.'
    },
    {
        id: 'product13',
        name: 'منتجات متنوعة 4',
        category: 'أخرى',
        image: 'images/catalog_pages/Retaj Cataloug_page-0014.jpg',
        description: 'منتجات متنوعة إضافية.'
    },
    {
        id: 'product14',
        name: 'منتجات متنوعة 5',
        category: 'أخرى',
        image: 'images/catalog_pages/Retaj Cataloug_page-0015.jpg',
        description: 'منتجات متنوعة إضافية.'
    },
    {
        id: 'product15',
        name: 'منتجات متنوعة 6',
        category: 'أخرى',
        image: 'images/catalog_pages/Retaj Cataloug_page-0016.jpg',
        description: 'منتجات متنوعة إضافية.'
    },
    {
        id: 'product16',
        name: 'منتجات متنوعة 7',
        category: 'أخرى',
        image: 'images/catalog_pages/Retaj Cataloug_page-0017.jpg',
        description: 'منتجات متنوعة إضافية.'
    },
    {
        id: 'product17',
        name: 'منتجات متنوعة 8',
        category: 'أخرى',
        image: 'images/catalog_pages/Retaj Cataloug_page-0018.jpg',
        description: 'منتجات متنوعة إضافية.'
    },
    {
        id: 'product18',
        name: 'منتجات متنوعة 9',
        category: 'أخرى',
        image: 'images/catalog_pages/Retaj Cataloug_page-0019.jpg',
        description: 'منتجات متنوعة إضافية.'
    },
    {
        id: 'product19',
        name: 'منتجات متنوعة 10',
        category: 'أخرى',
        image: 'images/catalog_pages/Retaj Cataloug_page-0020.jpg',
        description: 'منتجات متنوعة إضافية.'
    },
    {
        id: 'product20',
        name: 'منتجات متنوعة 11',
        category: 'أخرى',
        image: 'images/catalog_pages/Retaj Cataloug_page-0021.jpg',
        description: 'منتجات متنوعة إضافية.'
    },
    {
        id: 'product21',
        name: 'منتجات متنوعة 12',
        category: 'أخرى',
        image: 'images/catalog_pages/Retaj Cataloug_page-0022.jpg',
        description: 'منتجات متنوعة إضافية.'
    },
    {
        id: 'product22',
        name: 'منتجات متنوعة 13',
        category: 'أخرى',
        image: 'images/catalog_pages/Retaj Cataloug_page-0023.jpg',
        description: 'منتجات متنوعة إضافية.'
    },
    {
        id: 'product23',
        name: 'منتجات متنوعة 14',
        category: 'أخرى',
        image: 'images/catalog_pages/Retaj Cataloug_page-0024.jpg',
        description: 'منتجات متنوعة إضافية.'
    },
    {
        id: 'product24',
        name: 'منتجات متنوعة 15',
        category: 'أخرى',
        image: 'images/catalog_pages/Retaj Cataloug_page-0025.jpg',
        description: 'منتجات متنوعة إضافية.'
    },
    {
        id: 'product25',
        name: 'منتجات متنوعة 16',
        category: 'أخرى',
        image: 'images/catalog_pages/Retaj Cataloug_page-0026.jpg',
        description: 'منتجات متنوعة إضافية.'
    },
    {
        id: 'product26',
        name: 'منتجات متنوعة 17',
        category: 'أخرى',
        image: 'images/catalog_pages/Retaj Cataloug_page-0027.jpg',
        description: 'منتجات متنوعة إضافية.'
    },
    {
        id: 'product27',
        name: 'منتجات متنوعة 18',
        category: 'أخرى',
        image: 'images/catalog_pages/Retaj Cataloug_page-0028.jpg',
        description: 'منتجات متنوعة إضافية.'
    },
    {
        id: 'product28',
        name: 'منتجات متنوعة 19',
        category: 'أخرى',
        image: 'images/catalog_pages/Retaj Cataloug_page-0029.jpg',
        description: 'منتجات متنوعة إضافية.'
    },
    {
        id: 'product29',
        name: 'منتجات متنوعة 20',
        category: 'أخرى',
        image: 'images/catalog_pages/Retaj Cataloug_page-0030.jpg',
        description: 'منتجات متنوعة إضافية.'
    },
    {
        id: 'product30',
        name: 'منتجات متنوعة 21',
        category: 'أخرى',
        image: 'images/catalog_pages/Retaj Cataloug_page-0031.jpg',
        description: 'منتجات متنوعة إضافية.'
    },
    {
        id: 'product31',
        name: 'منتجات متنوعة 22',
        category: 'أخرى',
        image: 'images/catalog_pages/Retaj Cataloug_page-0032.jpg',
        description: 'منتجات متنوعة إضافية.'
    },
    {
        id: 'product32',
        name: 'منتجات متنوعة 23',
        category: 'أخرى',
        image: 'images/catalog_pages/Retaj Cataloug_page-0033.jpg',
        description: 'منتجات متنوعة إضافية.'
    },
    {
        id: 'product33',
        name: 'منتجات متنوعة 24',
        category: 'أخرى',
        image: 'images/catalog_pages/Retaj Cataloug_page-0034.jpg',
        description: 'منتجات متنوعة إضافية.'
    },
    {
        id: 'product34',
        name: 'منتجات متنوعة 25',
        category: 'أخرى',
        image: 'images/catalog_pages/Retaj Cataloug_page-0035.jpg',
        description: 'منتجات متنوعة إضافية.'
    },
    {
        id: 'product35',
        name: 'منتجات متنوعة 26',
        category: 'أخرى',
        image: 'images/catalog_pages/Retaj Cataloug_page-0036.jpg',
        description: 'منتجات متنوعة إضافية.'
    },
    {
        id: 'product36',
        name: 'منتجات متنوعة 27',
        category: 'أخرى',
        image: 'images/catalog_pages/Retaj Cataloug_page-0037.jpg',
        description: 'منتجات متنوعة إضافية.'
    },
    {
        id: 'product37',
        name: 'منتجات متنوعة 28',
        category: 'أخرى',
        image: 'images/catalog_pages/Retaj Cataloug_page-0038.jpg',
        description: 'منتجات متنوعة إضافية.'
    },
    {
        id: 'product38',
        name: 'منتجات متنوعة 29',
        category: 'أخرى',
        image: 'images/catalog_pages/Retaj Cataloug_page-0039.jpg',
        description: 'منتجات متنوعة إضافية.'
    },
    {
        id: 'product39',
        name: 'منتجات متنوعة 30',
        category: 'أخرى',
        image: 'images/catalog_pages/Retaj Cataloug_page-0040.jpg',
        description: 'منتجات متنوعة إضافية.'
    },
    {
        id: 'product40',
        name: 'منتجات متنوعة 31',
        category: 'أخرى',
        image: 'images/catalog_pages/Retaj Cataloug_page-0041.jpg',
        description: 'منتجات متنوعة إضافية.'
    },
    {
        id: 'product41',
        name: 'منتجات متنوعة 32',
        category: 'أخرى',
        image: 'images/catalog_pages/Retaj Cataloug_page-0042.jpg',
        description: 'منتجات متنوعة إضافية.'
    },
    {
        id: 'product42',
        name: 'منتجات متنوعة 33',
        category: 'أخرى',
        image: 'images/catalog_pages/Retaj Cataloug_page-0043.jpg',
        description: 'منتجات متنوعة إضافية.'
    },
    {
        id: 'product43',
        name: 'منتجات متنوعة 34',
        category: 'أخرى',
        image: 'images/catalog_pages/Retaj Cataloug_page-0044.jpg',
        description: 'منتجات متنوعة إضافية.'
    },
    {
        id: 'product44',
        name: 'منتجات متنوعة 35',
        category: 'أخرى',
        image: 'images/catalog_pages/Retaj Cataloug_page-0045.jpg',
        description: 'منتجات متنوعة إضافية.'
    },
    {
        id: 'product45',
        name: 'منتجات متنوعة 36',
        category: 'أخرى',
        image: 'images/catalog_pages/Retaj Cataloug_page-0046.jpg',
        description: 'منتجات متنوعة إضافية.'
    },
    {
        id: 'product46',
        name: 'منتجات متنوعة 37',
        category: 'أخرى',
        image: 'images/catalog_pages/Retaj Cataloug_page-0047.jpg',
        description: 'منتجات متنوعة إضافية.'
    }
];


