import { AlbumSkeleton, ExpertsSkeleton, FaqSkeleton } from "./incubator-skeleton/AlbumExpertsFaqSkeleton";
import { GradsSkeleton, JoinSkeleton, TestimonialsSkeleton } from "./incubator-skeleton/GradsJoinTestiSkeleton";
import { EventsSkeleton, SponsorSkeleton } from "./incubator-skeleton/SponsorEventsSkeleton";
import { CoursesSkeleton, WhySkeleton } from "./incubator-skeleton/WhyCoursesSkeleton";

/* Everything below the hero until GET /pages/incubator lands.

   Every section is the real one's markup — the same elements and classes as
   WhyIncubator, PopularCourses … IncubatorTestimonials — with each text
   swapped for a <SkeletonText /> of the current copy's length and each photo,
   avatar and button for a grey block of its box (./incubator-skeleton). So
   each section is already the height it will be at every breakpoint, and
   nothing below it moves when the answer arrives. Item counts and copy
   lengths are the payload's as of writing (incubator-skeleton/skeleton-data);
   keep them, and the markup, in step with those components. */
export default function IncubatorSkeleton() {
  return (
    <div className="incskel-root" aria-busy="true" aria-hidden="true">
      <WhySkeleton />
      <CoursesSkeleton />
      <SponsorSkeleton />
      <EventsSkeleton />
      <AlbumSkeleton />
      <ExpertsSkeleton />
      <FaqSkeleton />
      <GradsSkeleton />
      <JoinSkeleton />
      <TestimonialsSkeleton />
    </div>
  );
}
