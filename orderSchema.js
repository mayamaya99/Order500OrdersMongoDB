const orderSchema = new mongoose.Schema({
    storeId: String,
    salesPersonId: String,
    cdId: String,
    pricePaid: Number,
    date: Date
});
