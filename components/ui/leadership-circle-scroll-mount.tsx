import { createRoot } from 'react-dom/client';
import { LeadershipCircleScroll, type ScrollProfile } from './scrolling-animation';

const WIT_SPEAKER_PROFILES: ScrollProfile[] = [
  {
    name: 'Sharon Pais',
    image: 'images/speakers/announced-soon-female-2.jpeg',
  },
  {
    name: 'Vindhya',
    image: 'images/speakers/announced-soon-female.jpeg',
  },
  {
    name: 'Pramod Adiddam',
    image: 'images/On_this_man_standing_straight_202606081703 (1).jpeg',
  },
];

const STOCK_PEOPLE_IMAGES = [
  'images/speakers/announced-soon-female.jpeg',
  'images/speakers/announced-soon-female-2.jpeg',
  'images/speakers/announced-soon-1.jpeg',
  'images/speakers/announced-soon-2.jpeg',
  'images/have_the_female_hairs_on_202606081700.jpeg',
  'images/On_this_man_standing_straight_202606081703 (1).jpeg',
];

function randomRingAngles(count: number, seed: number): number[] {
  let state = seed;
  const angles: number[] = [];

  for (let i = 0; i < count; i += 1) {
    state = (state * 16807) % 2147483647;
    angles.push((state / 2147483647) * 360 - 180);
  }

  return angles;
}

function buildRingProfiles(
  count: number,
  imageOffset: number,
  seed: number,
  label: string,
): ScrollProfile[] {
  const angles = randomRingAngles(count, seed);

  return Array.from({ length: count }, (_, index) => ({
    name: `${label} ${index + 1}`,
    image: STOCK_PEOPLE_IMAGES[(index + imageOffset) % STOCK_PEOPLE_IMAGES.length],
    angleDeg: angles[index],
  }));
}

const speakerProfiles: ScrollProfile[] = WIT_SPEAKER_PROFILES;

const middleRingProfiles = buildRingProfiles(7, 0, 42017, 'Guest');
const outerRingProfiles = buildRingProfiles(8, 3, 91033, 'Attendee');

export function mountLeadershipCircleScroll() {
  const rootEl = document.getElementById('leadership-circle-scroll-root');
  if (!rootEl) return;

  createRoot(rootEl).render(
    <LeadershipCircleScroll
      eyebrow="About"
      title="Get a Chance to Meet these Speakers"
      introType="only-100-seats"
      hundredEmojiSrc="assets/only-100-seats/100-emoji.png"
      seatImageSrc="assets/only-100-seats/seat.png"
      profiles={speakerProfiles}
      middleRingProfiles={middleRingProfiles}
      outerRingProfiles={outerRingProfiles}
    />,
  );
}
