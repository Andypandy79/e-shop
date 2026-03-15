'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Plus, Minus, Loader } from 'lucide-react';
import { Cart, CartItem } from '@/types';
import { toast } from 'sonner';
import { addItemToCart, removeItemFromCart } from '@/lib/actions/card.action';
import { useTransition } from 'react';

const AddToCart = ({ cart, item }: { cart?: Cart; item: CartItem }) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleAddToCart = async () => {
    startTransition(async () => {
      const res = await addItemToCart(item);
      if (!res.success) {
        toast.error(res.message, {
          style: {
            backgroundColor: 'red',
            color: 'white',
          },
        });
        return;
      }

      toast(res.message, {
        action: {
          label: 'Go to Cart',
          onClick: () => router.push('/cart'),
        },
      });
    });
  };

  // Handle remove from card
  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);
      toast(res.message, {
        action: {
          label: 'Go to Cart',
          onClick: () => router.push('/cart'),
        },
      });
      return;
    });
  };

  // Check if item is in cart
  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);

  return existItem ? (
    <div>
      <Button
        type='button'
        variant='outline'
        onClick={handleRemoveFromCart}>
        {isPending ? (
          <Loader className='w-3 h-3 animate-spin' />
        ) : (
          <Minus className='h-3 w-3' />
        )}
      </Button>
      <span className='px-2'>{existItem.qty}</span>
      <Button
        type='button'
        variant='outline'
        onClick={handleAddToCart}>
        {isPending ? (
          <Loader className='w-3 h-3 animate-spin' />
        ) : (
          <Plus className='h-3 w-3' />
        )}
      </Button>
    </div>
  ) : (
    <Button
      className='w-full cursor-pointer'
      type='button'
      onClick={handleAddToCart}>
      {isPending ? (
        <Loader className='w-3 h-3 animate-spin' />
      ) : (
        <Plus className='h-3 w-3' />
      )}
      Add To Cart
    </Button>
  );
};

export default AddToCart;
