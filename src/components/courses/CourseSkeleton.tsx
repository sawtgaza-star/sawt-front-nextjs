import { GoalsSkeleton, ModulesSkeleton, OutcomesSkeleton, PerksSkeleton } from "./course-skeleton/ContentSkeletonA";
import {
  AsideSkeleton,
  RequirementsSkeleton,
  SelectionSkeleton,
  TrainerSkeleton,
} from "./course-skeleton/ContentSkeletonB";
import "@/styles/incubator-skeleton.css";

/* The course body until GET /pages/courses/{slug} lands.

   It is the real layout — the [content | aside] grid with the seven sections
   CourseContent renders and the floating registration + share cards — with
   the copy swapped for <SkeletonText /> and the photo / buttons for grey
   blocks (./course-skeleton). Item counts and copy lengths are the current
   course's, so the page is about its final height and doesn't jump when the
   answer arrives. Keep it in step with those components. */
export default function CourseSkeleton() {
  return (
    <div className="crs-layout incskel-root" aria-busy="true" aria-hidden="true">
      <div className="crs-content">
        <GoalsSkeleton />
        <ModulesSkeleton />
        <OutcomesSkeleton />
        <PerksSkeleton />
        <RequirementsSkeleton />
        <SelectionSkeleton />
        <TrainerSkeleton />
      </div>
      <AsideSkeleton />
    </div>
  );
}
