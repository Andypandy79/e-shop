'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Plus, Minus, Loader } from 'lucide-react';
import { Cart, CartItem } from '@/types';
import { toast } from 'sonner';
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions';
import { useTransition } from 'react';

// function AddButton({ item }: { item: CartItem }) {
//   const [isPending, startTransition] = useTransition();
//   const router = useRouter();
//   return (
//     <Button
//       className='cursor-pointer'
//       disabled={isPending}
//       variant='outline'
//       type='button'
//       onClick={() =>
//         startTransition(async () => {
//           const res = await addItemToCart(item);
//           if (!res.success) {
//             toast.error(res.message);
//           }

//           toast(res.message, {
//             action: {
//               label: 'Go to Cart',
//               onClick: () => router.push('/cart'),
//             },
//           });
//         })
//       }>
//       {isPending ? (
//         <Loader className='w-4 h-4 animate-spin' />
//       ) : (
//         <Plus className='w-4 h-4' />
//       )}
//     </Button>
//   );
// }

function RemoveButton({ item }: { item: CartItem }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <Button
      className='cursor-pointer'
      disabled={isPending}
      variant='outline'
      type='button'
      onClick={() =>
        startTransition(async () => {
          const res = await removeItemFromCart(item.productId);
          toast.success(res.message, {
            action: {
              label: 'Go to Cart',
              onClick: () => router.push('/cart'),
            },
          });
        })
      }>
      {isPending ? (
        <Loader className='w-4 h-4 animate-spin' />
      ) : (
        <Minus className='w-4 h-4' />
      )}
    </Button>
  );
}

const AddToCart = ({ cart, item }: { cart?: Cart; item: CartItem }) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleAddToCart = async () => {
    startTransition(async () => {
      const res = await addItemToCart(item);
      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message, {
        action: {
          label: 'Go to Cart',
          onClick: () => router.push('/cart'),
        },
      });
    });
  };

  // Handle remove from cart
  // const handleRemoveFromCart = async () => {
  //   startTransition(async () => {
  //     const res = await removeItemFromCart(item.productId);
  //     toast(res.message, {
  //       action: {
  //         label: 'Go to Cart',
  //         onClick: () => router.push('/cart'),
  //       },
  //     });
  //     return;
  //   });
  // };

  // Check if item is in cart
  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);

  return existItem ? (
    <div>
      {/* <Button
        type='button'
        variant='outline'
        onClick={handleRemoveFromCart}>
        {isPending ? (
          <Loader className='w-3 h-3 animate-spin' />
        ) : (
          <Minus className='h-3 w-3' />
        )}
      </Button> */}
      <RemoveButton item={item} />
      <span className='px-2'>{existItem.qty}</span>
      {/* <AddButton item={item} /> */}
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
