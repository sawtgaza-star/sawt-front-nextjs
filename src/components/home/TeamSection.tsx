// @ts-nocheck
"use client";
/* eslint-disable */

const MEMBERS = [
  { photo: "member1.jpg", nameKey: "team_member_1", name: "هديل طافش" },
  { photo: "member2.jpg", nameKey: "team_member_2", name: "محمد الأشقر" },
  { photo: "member3.jpg", nameKey: "team_member_3", name: "محمود الصالح" },
  { photo: "member4.jpg", nameKey: "team_member_4", name: "هديل طافش" },
  { photo: "member5.jpg", nameKey: "team_member_5", name: "انس مليحة" },
];

function TeamCard({ member }: { member: (typeof MEMBERS)[number] }) {
  return (
    <div className="item">
      <div className="mic-container">
        <div className="member-photo-box"><img src={member.photo} /></div>
        <img src="/assets/images/مايك عوض 6.png" className="mic-frame" />
        <div className="member-name-tag" data-i18n={member.nameKey}>{member.name}</div>
      </div>
      <div className="btn-profile-wrapper">
        <a href="#" className="btn-view-profile">
          <span data-i18n="view_profile">عرض الملف الشخصي</span>
          <i className="fa-solid fa-angle-left"></i>
        </a>
      </div>
    </div>
  );
}

export default function TeamSection() {
  return (
    <section className="team-section text-center">
      <div className="bg-scattered-photos">
        <img src="member1.jpg" className="pic-1" />
        <img src="member2.jpg" className="pic-2" />
        <img src="member3.jpg" className="pic-3" />
        <img src="member4.jpg" className="pic-4" />
      </div>
      <img src="/assets/images/leaf_cutout.png" className="olive-branch branch-left-top" alt="Olive Branch" />
      <img src="/assets/images/leaf_cutout.png" className="olive-branch branch-right-bottom" alt="Olive Branch" />
      <div className="container font-42">
        <h1 className="title">
          <span data-i18n="team_title_pre">أعضاء</span>{" "}
          <span><span className="who-us" data-i18n="team_title_highlight">فريقنا</span></span>
        </h1>
        <p className="mb-5 describ-p" data-i18n="team_subtitle">تعرّف على فريق صوت، مبدعين يصنعون الفرق</p>
        <div className="owl-carousel owl-theme team-carousel">
          {MEMBERS.map((m) => (
            <TeamCard key={m.nameKey} member={m} />
          ))}
        </div>
      </div>
    </section>
  );
}
