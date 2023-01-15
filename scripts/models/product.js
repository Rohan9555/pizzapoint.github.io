
class Product{
    constructor(id, name, price, desc="", url, isVeg=true){
        this.id = id;
        this.name = name;
        this.price = price;
        this.desc = desc;
        this.url = url;
        this.isVeg = isVeg;
        this.isAddedInCart = false;
    }
}
export default Product;
