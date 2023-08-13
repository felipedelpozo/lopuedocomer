import SocialImageResponse from '@/components/social-image-response';
import { PageLocale } from '@/types';

export const runtime = 'edge';

export default async function OpengraphImage({
  params: { locale },
}: PageLocale) {
  return await SocialImageResponse({ width: 1200, height: 630, locale });
}
