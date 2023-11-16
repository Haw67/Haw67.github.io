const product = [
   {
       id: 0,
       image: 'image/patek.jpg',
       title: 'GRAND COMPLICATIONS',
       price: 79,
   },
   {
       id: 1,
       image: 'image/silver.jpg',
       title: 'NAUTILUS diamond 18.73ct',
       price: 129,
   },
   {
       id: 2,
       image: 'image/pink.webp',
       title: 'Day-Date II natural diamond 17.25ct',
       price: 99,
   },
   {
       id: 3,
       image: 'image/green.png',
       title: 'Green Submariner',
       price: 99,
   },
   {
       id: 4,
       image: 'image/cartier1.jpg',
       title: 'ROTONDE DE',
       price: 119,
   },
   {
       id: 5,
       image: 'image/cartier2.jpg',
       title: 'PASHA DE',
       price: 109,
   },
   {
       id: 6,
       image: 'image/hermes1.webp',
       title: 'Faubourg watch, Mini model',
       price: 69,
   },
   {
       id: 7,
       image: 'image/hermes2.webp',
       title: 'La matiere du temps watch',
       price: 69,
   },
   {
       id: 8,
       image: 'image/piguet.png',
       title: 'ULTRA-COMPLICATION UNIVERSELLE',
       price: 89,
   }
   
];
const categories = [...new Set(product.map((item)=>
    {return item}))]
    let i=0;
document.getElementById('root').innerHTML = categories.map((item)=>
{
    var {image, title, price} = item;
    return(
        `<div class='box'>
            <div class='img-box'>
                <img class='images' src=${image}></img>
            </div>
        <div class='bottom'>
        <p>${title}</p>
        <h2>$ ${price}.00</h2>`+
        "<button onclick='addtocart("+(i++)+")'>Add to cart</button>"+
        `</div>
        </div>`
    )
}).join('')

var cart =[];

function addtocart(a){
    cart.push({...categories[a]});
    displaycart();
}
function delElement(a){
    cart.splice(a, 1);
    displaycart();
}

function displaycart(){
    let j = 0, total=0;
    document.getElementById("count").innerHTML=cart.length;
    if(cart.length==0){
        document.getElementById('cartitem').innerHTML = "Your cart is empty";
        document.getElementById("total").innerHTML = "$ "+0+".00";
    }
    else{
        document.getElementById("cartitem").innerHTML = cart.map((items)=>
        {
            var {image, title, price} = items;
            total=total+price;
            document.getElementById("total").innerHTML = "$ "+total+".00";
            return(
                `<div class='cart-item'>
                <div class='row-img'>
                    <img class='rowimg' src=${image}>
                </div>
                <p style='font-size:12px;'>${title}</p>
                <h2 style='font-size: 15px;'>$ ${price}.00</h2>`+
                "<i class='fa-solid fa-trash' onclick='delElement("+ (j++) +")'></i></div>"
            );
        }).join('');
    }

    
}

