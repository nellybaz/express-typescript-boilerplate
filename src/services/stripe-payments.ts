import { inject, injectable } from "inversify";
import TYPES from "../../config/types";
import { IStripeSessionIdContractIdData } from "../interfaces/stripe-contract-id.interface";
import { StripeSessionIdContractIdRepository } from "../repository/stripe-session-contract-id.repository";
import Stripe from 'stripe';
import config from "../../config";
const stripe = new Stripe(config.server.stripeKey, {
    apiVersion: '2020-08-27'
});


@injectable()
export class StripePaymentService {
    constructor(@inject(TYPES.StripeSessionIdContractIdRepository) private _repo: StripeSessionIdContractIdRepository) {}

    async storeStripeSessionIdWithContractId(data: IStripeSessionIdContractIdData):Promise<boolean> {
        try {
          return (await this._repo.create(data)) != null;
        } catch (error) {
          console.log(error);
          return false;
        }
    }

    async createSession(data:any){
       try {
         const {contractId} = data
           const product = await stripe.products.create({
               name: `Emeka-Mike<>ABitNetwork-Contract-${new Date().toISOString()}`,
               active: true
           });

           const price = await stripe.prices.create({
               product: product.id,
               unit_amount: 1000,
               currency: 'USD',
               active: true
           });

           const session = await stripe.checkout.sessions.create({
               success_url: 'https://www.mypayday.africa',
               cancel_url: 'https://www.mypayday.africa',
               payment_method_types: ['card'],
               line_items: [{ price: price.id, quantity: 1 }],
               mode: 'payment',
               customer_email: 'nellybaz10@gmail.com'
           });

           return {
               id: session.id
           };
       } catch (error: any) {
           console.log('error here');

           console.log(error);

           return {
               error
           };
       }
    }
}