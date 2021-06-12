import { controller, httpGet } from 'inversify-express-utils';
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51J00Y7A0wYRZlPRCc4KDKLVOEFqMvemcb8z4myx6Ze0HLHG9dgGJubAKfqLY1BLvu7lczbCi5fFORBwm8Lc6o4Yj00AyL4jdE8', {
    apiVersion: '2020-08-27'
});

@controller('/api')
export class PaymentController {

  /**
   * receives contract id from the request
   * 
   * 
   * @returns 
   */
    @httpGet('/stripe')
    async sessionId() {
      /**
       * TODO: 
       * 
       * 1 write test and clean up this module
       * 2 store sessionId, mapped to contract and status[paid or not]
       * 3 retrieve sessionId to get payerEmail and send out email notifications to both talent and payer
       * 4 checkout stripe webhooks to trigger 3 above
       * 4 mark contract as paid and other processing
       * 5 credit user's payday balance
       * 
       * 
       * => contract id should return error to the frontend when trying to get contract details for an already paid contract 
       */
        try {
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
