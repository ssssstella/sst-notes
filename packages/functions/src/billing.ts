import Stripe from 'stripe';
import { Resource } from 'sst';
import { Util } from '@writeitdown/core/util';
import { Billing } from '@writeitdown/core/Billing';

export const main = Util.handler(async (event) => {
  const { storage, source } = JSON.parse(event.body || '{}');
  const amount = Billing.compute(storage);
  const description = 'Scratch charge';

  const stripe = new Stripe(Resource.StripeSecretKey.value, {
    apiVersion: '2025-01-27.acacia',
  });

  await stripe.charges.create({
    source,
    amount,
    description,
    currency: 'usd',
  });

  // TODO
  // store #notes, charging info in db

  return JSON.stringify({ status: true });
});
