import { ImageResponse } from 'next/server';
import { getTranslator } from 'next-intl/server';

export type Props = {
  title?: string;
  description?: string;
  locale?: string;
  width?: number;
  height?: number;
};

export default async function SocialImageResponse(
  props?: Props
): Promise<ImageResponse> {
  const t = await getTranslator(props?.locale ?? 'en', 'metadata');

  return new ImageResponse(
    (
      <div tw="flex h-full w-full flex-col p-10 bg-black">
        <p tw="text-4xl text-white mb-0">
          {!props?.title && <span tw="font-bold">LoPuedoComer</span>}
          {props?.title && <span tw="font-bold">{props.title}</span>}
        </p>
        <p tw="text-7xl text-white pt-10">
          {props?.description ?? t.rich('description')}
        </p>
        <p tw="absolute bottom-10 text-xl text-white pl-10">lopuedocomer.com</p>
      </div>
    ),
    {
      width: props?.width ?? 1200,
      height: props?.height ?? 630,
      fonts: [
        {
          name: 'Inter',
          data: await fetch(
            new URL('@/fonts/Inter-Bold.ttf', import.meta.url)
          ).then((res) => res.arrayBuffer()),
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );
}
