var percentageCotton = 80
var percentagePolyester = 20

var app = new Vue({
    el: '#app',
    data: {
        brand: "Vue mastery" ,
        product: 'socks',
        //image: './assets/images/socks_blue.jpg',
        selectedImage: 0,
        altText : 'blue socks image',
        variants: [
            {
                variantId:1, 
                variantColor:'blue', 
                variantImg:'./assets/images/socks_blue.jpg',
                variantQuanity: 10,
                variantOnSale: true
            },
            {
                variantId:2, 
                variantColor:'green', 
                variantImg:'./assets/images/socks_green.jpg',
                ariantQuanity: 0,
                variantOnSale: false
            }
        ],
        description: 'A pair of warm, fuzzy stocks',
        onSale: true,
        //inStock: true,
        details: [`cotton: ${percentageCotton}%`, `polyester: ${percentagePolyester}%`],
        anchorLink: 
        'https://www.vuemastery.com/courses/intro-to-vue-js/attribute-binding',
        cart: 0,
    },
    methods: {
        addToCart: function(){
            this.cart += 1
        },
        removeFromCart(){ // challenge 5
            if(this.cart > 0){
                this.cart -= 1
            }
        },
        // updateProduct: function(variantImg){
        //     this.image = variantImg
        // },
        updateProduct: function(index){
            this.selectedImage = index
        }
    },
    computed:{
        title(){
            return this.brand + ' ' + this.product
        },
        image(){
            return this.variants[this.selectedImage].variantImg
        },
        inStock(){
            return this.variants[this.selectedImage].variantQuanity
        },
        sale(){
            if(this.onSale){
                return this.brand + ' ' + this.product + ' are on sale'
            }
            else{
                return this.brand + ' ' + this.product + ' are not on sale'
            }
        }
    }
})


