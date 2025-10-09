import Cart from "../models/Cart.model.js";

const getCart = async (userId , guestId) => {
    if(userId){
        return await Cart.findOne({ user: userId })
    }else if (guestId){
        return await Cart.findOne({ guestId })
    }
    return null
}

export default getCart  