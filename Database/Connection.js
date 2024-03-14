
import mongoose from 'mongoose';
export const DBconnection = () => {
    mongoose.connect('mongodb+srv://alikassab:3Wu!*ghTy25$tr@cluster0.2wxsgip.mongodb.net/Ecommerce').then(() => {
        console.log('database connected');
    }).catch((error) => {
        console.log(error);
    })
}

