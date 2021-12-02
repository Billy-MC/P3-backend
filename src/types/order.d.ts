export default interface IOrder extends Document {
    orderId: string,
    customerId: string,
    products: [string],
    dateCreated: Date,
    status: Status,
}