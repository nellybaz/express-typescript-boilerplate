import { inject, injectable } from 'inversify';
import TYPES from '../../config/types';
import { IStripeSessionIdContractIdData } from '../interfaces/stripe-contract-id.interface';
import { StripeSessionIdContractIdRepository } from '../repository/stripe-session-contract-id.repository';
import Stripe from 'stripe';
import config from '../../config';
import { TalentContractRepository } from '../repository/talent-contract.repository';
const stripe = new Stripe(config.server.stripeKey, {
    apiVersion: '2020-08-27'
});

@injectable()
export class StripePaymentService {
    constructor(
        @inject(TYPES.StripeSessionIdContractIdRepository) private stripeSessionIdRepo: StripeSessionIdContractIdRepository,
        @inject(TYPES.TalentContractRepository) private contractRepo: TalentContractRepository
    ) {}

    async storeStripeSessionIdWithContractId(data: IStripeSessionIdContractIdData): Promise<boolean> {
        try {
            return (await this.stripeSessionIdRepo.create(data)) != null;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async createProduct(contractDetails: any) {
        const contractOwnerFirstName = contractDetails.owner.firstName;
        const contractOwnerLastName = contractDetails.owner.lastName;
        return await stripe.products.create({
            name: `${contractOwnerFirstName}-${contractOwnerLastName}<>Contract`,
            active: true
        });
    }

    async createPrice(product: Stripe.Product, contractDetails: any) {
        return await stripe.prices.create({
            product: product.id,
            unit_amount: contractDetails.amount,
            currency: 'USD',
            active: true
        });
    }

    async createSession(data: any) {
        try {
            const { contractId } = data;
            const contractDetails = await this.contractRepo.getContractWithOwnerDetails(contractId);

            const product = await this.createProduct(contractDetails);

            const price = await this.createPrice(product, contractDetails);

            const session = await stripe.checkout.sessions.create({
                success_url: 'https://www.mypayday.africa',
                cancel_url: 'https://www.mypayday.africa',
                payment_method_types: ['card'],
                line_items: [{ price: price.id, quantity: 1 }],
                mode: 'payment',
                customer_email: contractDetails.payerEmail
            });

            const mapSessionIdToContractId = await this.storeStripeSessionIdWithContractId({ stripeSessionId: session.id, contractId: contractId, isPaid: false });
            if (mapSessionIdToContractId)
                return {
                    data: {
                        id: session.id
                    },
                    message: 'session created successfully'
                };

            return {
                error: 'could not create sesssion id'
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
