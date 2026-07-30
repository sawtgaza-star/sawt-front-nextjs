/* Ported verbatim from legacy assets/js/translate.js — DOM-based i18n (AR/EN) */
/* eslint-disable */
// @ts-nocheck
"use client";

/* =========================================================
   Sawt — Language Translation Module (AR / EN)
   ---------------------------------------------------------
   - Toggles language between Arabic and English
   - Persists choice in localStorage
   - Switches document direction (rtl / ltr)
   - Translates any element with [data-i18n]
   - Translates placeholders via [data-i18n-placeholder]
   - Translates titles/aria-labels via [data-i18n-title]
   ========================================================= */

export const translations: any = {
  ar: {
    // Top bar
    follow_us: "وسائل التواصل الاجتماعي :",
    email: "info@sawtgaza.com",
    phone: "+972567247177",
    register_account: "أنشئ حساب",
    sign_in: "تسجيل الدخول",

    // Nav
    nav_home: "الرئيسية",
    nav_about: "من نحن",
    nav_content: "محتوانا",
    nav_team: "الفريق",
    nav_creators: "صناع المحتوى",
    nav_incubator: "حاضنة صوت",
    nav_media: "صوت ميديا",
    search_placeholder: "ابحث هنا...",
    search_not_found: "لا توجد نتائج في هذه الصفحة",

    // محتوانا page (/content)
    content_hero_desc:
      "خلف كل محتوى تشاهده وتسمعه فريق من المختصين في تكنولوجيا المعلومات والإنتاج الإعلامي، نؤمن أن التكنولوجيا هي وسيلتنا لنقل الحقيقة، وأن إبداعنا هو الصوت الذي يصل بصدى غزة إلى آفاق العالم.",
    content_cat_all: "الكل",
    content_cat_economy: "الاقتصاد (13)",
    content_cat_war: "قصص الحرب (45)",
    content_cat_business: "المال والأعمال (13)",
    content_cat_news: "الاخبار (13)",
    content_sort_label: "الترتيب",
    content_sort_newest: "من الأحدث إلى الأقدم",
    content_sort_oldest: "من الأقدم إلى الأحدث",
    content_sort_views: "الأكثر مشاهدة",
    content_most_watched_pre: "الأكثر",
    content_most_watched_hl: "مشاهدة",
    content_view_more: "رؤية المزيد",

    // Content Creators page (صناع المحتوى)
    brand_sawt: "صوت",
    creators_hero_title: "صنّاع المحتوى في صوت",
    creators_hero_desc:
      "تعرّف على صنّاع المحتوى في صوت، حيث كل فكرة إلها صوت، وكل مبدع إله حكاية.",
    creators_grid_count: "+47",
    creators_grid_title_pre: "صانع محتوى ناجح في",
    creators_grid_sub:
      "تعرّف على صنّاع المحتوى في صوت، حيث كل فكرة إلها صوت، وكل مبدع إله حكاية.",
    creators_card_name: "محمود عبد الله زعيتر",
    creators_card_role: "ممثل مسرحي",
    creators_followers: "متابع",
    creators_stats_title_pre: "انجازات",
    creators_stats_title_mid: "صناع محتوى",
    creators_stats_sub: "أرقام حقيقية تعكس قوة مجتمعنا",
    creators_stat_reach: "شخص وصلهم المحتوى",
    creators_stat_funding: "دعم مالي وُزّع",
    creators_stat_ads: "إعلان تعاوني نُفّذ",
    creators_stat_active: "صانع محتوى نشط",
    creators_join_title: "انضم إلينا كصانع محتوى",
    creators_join_desc: "صوت تجمع صنّاع المحتوى، كن صوتاً لمن لا صوت له",
    creators_join_btn: "طلب الانضمام",
    creators_companies_title_pre: "شركات",
    creators_companies_title_hl: "إعلانية",
    creators_companies_title_post: "تعاونت مع صناع محتوى",
    creators_companies_sub: "شكراً للشركات التي حملت صوت أهل غزة إلى العالم",
    creators_company_name: "شركة الإبداع",
    creators_collab_title_pre: "كيف يبدأ التعاون مع",
    creators_collab_title_hl: "صناع محتوى صوت؟",
    creators_collab_sub:
      "وصلنا شركات من حول العالم بصنّاع المحتوى في غزة — صوت ميديا هي الجسر الذي يوصلك",
    creators_flow_brands: "الشركات والعلامات",
    creators_flow_brands_sub: "التجارية حول العالم",
    creators_flow_media: "ميديا صوت",
    creators_flow_trusted: "الوسيط الرسمي الموثوق",
    creators_flow_creators: "صناع المحتوى",
    creators_flow_creators_sub: "مبدعو غزة وفلسطين",
    creators_steps_title: "خطوات التعاون",
    creators_step_1_title: "ابحث واختر",
    creators_step_1:
      "استعرض ملفات صنّاعنا وفلتر حسب التخصص والميزانية والوصول الجماهيري",
    creators_step_2_title: "تواصل وتفاهم",
    creators_step_2:
      "فريق صوت ميديا يتولى التنسيق الكامل بينك وبين صانع المحتوى — من التفاصيل حتى العقد",
    creators_step_3_title: "أطلق وقس",
    creators_step_3:
      "المحتوى يُنتج ويُنشر، وتحصل على تقرير تفصيلي بالنتائج والوصول والتفاعل",
    creators_collab_cta: "تواصل مع صوت ميديا للتعاقد مع صناع المحتوى",
    creators_faq_title_pre: "الأسئلة التي",
    creators_faq_title_hl: "تدور ببالك؟",
    creators_faq_title_post: "إليك ردودها",
    creators_faq_title_mobile: "الأسئلة المتكررة",
    creators_faq_sub: "كل ما تحتاج معرفته قبل أن تبدأ رحلتك مع صوت",
    creators_faq_q1: "كيف يمكنني الانضمام كصانع محتوى؟",
    creators_faq_a1:
      "سجّل حسابك عبر زر «طلب الانضمام»، أكمل ملفك التعريفي وأضف نماذج من أعمالك، وسيتواصل معك فريق صوت لإتمام التفعيل.",
    creators_faq_q2: "هل الدفع مضمون للإعلانات التعاونية؟",
    creators_faq_a2:
      "عملية الدفع بسيطة جداً — احجز المبلغ وطريقة الدفع (بطاقة ائتمانية، PayPal، أو تحويل بنكي) واضغط «توزيع الآن». لن تأخذ أكثر من دقيقتين، ويصلك تأكيد فوري على بريدك الإلكتروني.",
    creators_faq_q3: "كيف تختار الشركات صانع المحتوى المناسب؟",
    creators_faq_a3:
      "تستعرض الشركات ملفات الصنّاع وتفلتر حسب التخصص والجمهور والميزانية، ويتولى فريق صوت ميديا الترشيح والتنسيق لضمان أفضل تطابق.",
    creators_faq_q4: "هل يمكنني الانضمام من أي بلد؟",
    creators_faq_a4:
      "نعم، الانضمام متاح لصنّاع المحتوى من فلسطين والعالم العربي، مع أولوية لإبراز أصوات غزة.",
    creators_faq_q5: "هل هناك رسوم للانضمام إلى المنصة؟",
    creators_faq_a5:
      "الانضمام مجاني بالكامل، وتحصل صوت على نسبة رمزية فقط عند إتمام تعاون إعلاني ناجح.",

    // Hero
    hero_title: "منصة صوت",
    hero_subtitle: "نروي قصص غزة بكرامة... ونبني جيلاً جديداً من صناع المحتوى",
    hero_trust: "ثقة آلاف المتابعين في منصة صوت غزة بصدق وتأثير",
    hero_btn_watch: "ادعم صوت",
    hero_btn_collab: "تعاون معنا",
    hero_btn_support: "ادعم صوت",

    // Stats
    stat_team: "أعضاء الفريق",
    stat_followers: "متابع",
    stat_views: "مشاهدة",
    stat_videos: "فيديو",
    stat_stories: "قصة",
    one_thousand: "ألف",

    // Sout section
    who_we_are: "من نحن",
    sout_intro_subtitle: "إعلام هادف، قصص حقيقية، وأثر مستدام",
    sout_main_title: "نؤمن أن لكل إنسان قصة تستحق أن تُري",
    sout_description:
      "ننقل قصص الناس وقضايا المجتمع من منظور إنساني ومهني نعمل على توثيق الواقع، وإبراز الحكايات التي قد لا تجد طريقها إلى الإعلام التقليدي، إيماناً منا بأن لكل إنسان صوتاً يستحق أن يُسمع وقصة تستحق أن تُروى من خلال :",
    sout_feature_1: "محتوى يُعبر عن صوتك",
    sout_feature_2: "تمكين المواهب الشابة",
    sout_feature_3: "الإنتاج والتغطيات الإعلامية",
    sout_feature_4: "صناعة أثر حقيقي ومستدام",
    welcome_label: "أهلاً بكم في صوت",
    welcome_title: "كل فكرة إلها صوت... وصوت بيجمعهم",
    welcome_lead: "في صوت، كل فكرة بتلاقي مكانها!",
    welcome_desc:
      "استكشف محتوى متنوع، عبّر عن نفسك، وشارك صوتك مع العالم، من خلال تجربة تفاعلية مليئة بالإبداع والإلهام، رح تقدر تطوّر أفكارك وتوصل لجمهور أوسع، وصوت بيكون معك خطوة بخطوة لتخلي صوتك يوصل أبعد.",
    feature_voice: "مساحة لأصواتكم",
    feature_creativity: "تمكين الإبداع",
    feature_publish: "خدمات تُسهّل النشر.",
    feature_empower_creativity: "مساحة لتمكين الإبداع",
    feature_expert_team: "فريق خبراء يدعمك",
    feature_express_voice: "محتوى يعبّر عن صوتك",
    support_creators: "ندعم صناع المحتوى",
    professional_team: "فريق محترف، محتوى مميز، وخدمات تساعد صوتك يوصل",
    discover_more: "اكتشف المزيد",

    // News section
    news_title_pre: "آخر",
    news_title_highlight: "أخبارنا",
    news_subtitle: "شاهد أحدث القصص والفيديوهات من منصة صوت",
    view_all_news: "عرض جميع الأخبار",

    // Creators section
    creators_title_pre: "صُناع",
    creators_title_highlight: "المحتوى",
    creators_title_full: "صُناع المحتوى في صوت",
    creators_title_main: "صُناع المحتوى",
    at_sawt: "في صوت",
    creators_subtitle:
      "تعرف على صُنّاع المحتوى في صوت، حيث كل فكرة إلها صوت، وكل مبدع إله حكاية.",
    creators_desc_main:
      "مجموعة من صُنّاع المحتوى المبدعين الذين يوظفون مهاراتهم لإنتاج محتوى هادف ومؤثر.",
    view_all: "عرض الكل",

    // Platform sections
    platform_title_pre: "أقسام",
    platform_title_highlight: "المنصة",
    platform_subtitle: "كل فكرة إلها صوت... وصوت بيجمعهم",
    platform_sections_subtitle:
      "أقسام متخصصة تتكامل لتحقيق رسالتنا في الإعلام والتنمية وصناعة التأثير",
    read_more: "اقرأ المزيد",

    // Partners
    partners_title_pre: "شركاؤنا في",
    partners_title_highlight: "صوت",
    partners_title_main: "شركاؤنا",
    partners_desc:
      "معًا نبني صوتًا حيًّا، مساحة تجمع الحكايات، تُشعل الأمل، وتمنح كل إنسان فرصة يُسمَع",
    partners_subtitle2: "شركاء يشاركوننا رحلة التأثير وصناعة التغيير.",
    be_partner: "كن شريكاً لصوت",

    // Stories
    stories_label: "قصص من الواقع",
    stories_title: "اكتشف تجارب حقيقية من أشخاص شاركوا قصصهم معنا",
    tell_story: "احكي قصتك",
    reviews_title_pre: "أرائكم في",
    reviews_title_pre2: "آراؤكم في",
    reviews_title_highlight: "المحتوى",
    reviews_trust_html:
      'نفخر <span class="hl">بثقة</span> جمهورنا، ونعتز بكل رأي يساهم في تطوير رسالتنا الإعلامية.',
    reviews_desc:
      "نؤمن أن رأيك جزء أساسي من تطويرنا وتحسين خدماتنا. شاركنا تجربتك واقتراحاتك وساعدنا على تقديم تجربة أفضل تلبي احتياجاتك وتوقعاتك.",
    reviews_desc_html:
      'نؤمن أن <span class="hl">رأيك</span> جزء أساسي من تطويرنا وتحسين خدماتنا. شاركنا تجربتك واقتراحاتك وساعدنا على تقديم تجربة أفضل تلبي احتياجاتك وتوقعاتك.',
    comments_word: "التعليقات",
    you_label: "أنت",
    now_label: "الآن",
    reply_label: "رد",
    reply_placeholder: "اكتب رداً...",
    comments_count_label: "الكومنت",
    tab_oldest: "الأقدم",
    tab_newest: "الأحدث",
    comment_placeholder: "اترك تعليقك هنا...",
    show_more: "عرض المزيد ↓",
    show_less: "عرض أقل ↑",

    // Opinions
    opinions_label: "آراء المستخدمين",
    opinions_title:
      "نؤمن أن رأيك هو جزء من تطويرنا .. شاركنا تجربتك وساعدنا نكون أفضل",
    share_opinion: "شاركنا رأيك",

    // Team
    team_title_pre: "أعضاء",
    team_title_highlight: "فريقنا",
    team_subtitle: "تعرّف على فريق صوت، مبدعين يصنعون الفرق",
    view_profile: "عرض الملف الشخصي",

    // Team page (/team)
    team_hero_title: "صناع الأثر..الفريق خلف منصة صوت",
    team_cat_all: "الكل",
    team_cat_design: "فريق التصميم",
    team_cat_marketing: "فريق التسويق",
    team_cat_management: "فريق الإدارة",
    team_cat_montage: "فريق المونتاج",
    team_card_name: "سمير البطل",
    team_card_role: "UI/UX Designer",
    team_detail_experience: "5 سنوات من الخبرة",
    team_detail_about_title: "نبذه عنه",
    team_detail_bio:
      "متخصص في تحويل الأفكار والرؤى المعقدة إلى تجارب (UI/UX) مصمم واجهات وتجربة مستخدم رقمية بخبرة تمتد لأكثر من 5 سنوات في فهم سلوك المستخدمين وتحليل احتياجاتهم، أركز في عملي على تحقيق التوازن المثالي بين جمالية الواجهات وأعلى معايير سهولة الاستخدام والوصول. الشغف المهني لفريق «صوت» غزة يترجم إيماني بأهمية تكنولوجيا الإعلام؛ حيث أعمل على تطوير وتصميم واجهات المنصة لتكون الجسر البصري والرقمي الذي يضمن تدفق المحتوى الإبداعي والقصص الإنسانية بسلاسة تامة وبأعلى جودة ممكنة.",
    team_detail_follow: "تابعنا على :",
    team_members_title: "اعضاء الفريق",
    team_members_title_pre: "اعضاء",
    team_members_title_highlight: "الفريق",

    // Footer
    footer_about:
      "منصة صوت، تأسست لتكون مساحة للمبدعين، تجمع الحاضنة، صوت ميديا، والصوت نفسه، لتقديم محتوى ملهم وتجارب فريدة لكل من يسعى لصوته أن يُسمع.",
    footer_main_sections: "الأقسام الرئيسية",
    footer_quick_links: "روابط سريعة",
    footer_backstage: "الكواليس",
    footer_media_kit: "MEDIA KIT",
    footer_impact_stories: "Impact Stories",
    footer_blog: "المدونة",
    footer_faq: "الأسئلة الشائعة",
    footer_stay_updated: "ابقَ على اطلاع",
    footer_subscribe: "اشترك في نشرتنا الإخبارية ..",
    footer_email_placeholder: "ادخل بريدك الالكتروني",
    footer_rights: "© جميع الحقوق محفوظة. 2026",
    footer_privacy: "سياسة الخصوصية",
    footer_terms: "شروط الاستخدام",

    // Sout description (multi-line)
    welcome_desc_line1:
      "استكشف محتوى متنوع، عبّر عن نفسك، وشارك صوتك مع العالم.",
    welcome_desc_line2:
      "من خلال تجربة تفاعلية مليئة بالإبداع والإلهام، رح تقدر تطور أفكارك وتوصل",
    welcome_desc_line3: "لجمهور أوسع.",
    welcome_desc_line4: "وصوت بيكون معك خطوة بخطوة لتخلي صوتك يوصل أبعد.",

    // News cards
    news_card1_title: "صانع المحتوى في غزة",
    news_card2_title: "الأم في غزة",
    news_card3_title: "المبتورين قضية مهمشة",
    news_desc:
      "نشارككم آخر تحديثات صانع المحتوى في غزة، حيث نعمل على إبراز قصص المبدعين وإيصال صوتهم.",
    news_date: "5 مارس 2026",
    news_duration: "10 دقائق",

    // Creators cards
    creator_share: "شارك مع صوت",
    creator_name: "محمود عبدالله زعيتر",
    creator_role: "ممثل مسرحية",
    creator_followers: "31.4K متابع",
    creator_bio: "صانع محتوى وفنان كوميدي فلسطيني من قطاع غزة",
    creator_quote:
      "تجربتي مع صوت كانت مختلفة، أخيراً لقيت مكان بيفهمني كمبدع ....",
    creator_overlay_title: "تجربتي مع صوت",
    view_more: "عرض المزيد",

    // Creator detail page (/creators/[id])
    creator_detail_name: "محمود عبد الله زعيتر",
    creator_detail_bio:
      "صانع محتوى متخصص في المسرح والفنون الأدائية يسعى لتقديم محتوى ثقافي هادف وقيّم",
    creator_detail_follow: "متابعة",
    creator_detail_follow_me: "تابعني على :",
    creator_detail_stat_views: "مشاهدة",
    creator_detail_stat_followers: "متابع",
    creator_detail_stat_videos: "فيديو",
    creator_content_cat_all: "الكل",
    creator_content_cat_economy: "الاقتصاد (13)",
    creator_content_cat_business: "المال والأعمال (13)",
    creator_content_cat_war: "قصص الحرب (45)",
    creator_content_cat_news: "الاخبار (13)",
    creator_collab_title: "ابرز التعاونات",
    creator_collab_title_1: "ابرز",
    creator_collab_title_2: "التعاونات",
    creator_collab_desc:
      "صناع محتوى صوت جزء لهم بصمتهم مع الشركات المحلية والعالمية ,",
    creator_collab_c1: "شركة الإبداع للإنتاج",
    creator_collab_c1_sub: "إنتاج إعلامي",
    creator_collab_c1_title: "أعلان لشركة الابداع",
    creator_collab_c1_views: "200k مشاهدة",
    creator_collab_c1_quote:
      '"محمود يمتلك قدرة نادرة على تحويل الفكرة إلى تجربة بصرية مؤثرة. تعاوننا معه كان من أنجح تجاربنا الإنتاجية"',
    creator_collab_c1_author: "رنا الصالح",
    creator_collab_c1_role: "مدير الإنتاج",
    creator_collab_c2: "مؤسسة الفن العربي",
    creator_collab_c2_sub: "فنون وثقافة",
    creator_collab_c2_title: "حملة الفن العربي",
    creator_collab_c2_views: "150k مشاهدة",
    creator_collab_c2_quote:
      '"تعاملنا مع محمود كان تجربة فنية راقية، فهو يترجم رؤيتنا الثقافية إلى محتوى بصري يلامس الجمهور"',
    creator_collab_c2_author: "سامي العلي",
    creator_collab_c2_role: "مدير الإبداع",
    creator_collab_c3: "قناة الأفق الفضائية",
    creator_collab_c3_sub: "بث تلفزيوني",
    creator_collab_c3_title: "برومو قناة الأفق",
    creator_collab_c3_views: "320k مشاهدة",
    creator_collab_c3_quote:
      '"احترافية عالية في التنفيذ والالتزام بالمواعيد. محمود أضاف لمسة مميزة على هويتنا الإعلامية"',
    creator_collab_c3_author: "هبة كمال",
    creator_collab_c3_role: "مديرة البرامج",
    creator_collab_c4: "دار النشر الحديثة",
    creator_collab_c4_sub: "نشر ومحتوى",
    creator_collab_c4_title: "حملة دار النشر",
    creator_collab_c4_views: "90k مشاهدة",
    creator_collab_c4_quote:
      '"قدرته على صياغة المحتوى وربطه بالصورة جعلت مشاريعنا أكثر تأثيرًا ووصولًا لجمهور أوسع"',
    creator_collab_c4_author: "خالد منصور",
    creator_collab_c4_role: "مدير التحرير",
    creator_collab_c5: "شركة تك ميديا",
    creator_collab_c5_sub: "تقنية إعلامية",
    creator_collab_c5_title: "إعلان تك ميديا",
    creator_collab_c5_views: "500k مشاهدة",
    creator_collab_c5_quote:
      '"دمج التقنية بالإبداع هو ما يميز عمل محمود، تعاوننا حقق أرقام مشاهدات تجاوزت توقعاتنا"',
    creator_collab_c5_author: "لينا فؤاد",
    creator_collab_c5_role: "مديرة التسويق",

    // Platform cards
    platform_card1_title: "منصة المحتوى",
    platform_card1_name: "منصة صوت",
    platform_card1_desc:
      "مكتبة غنية بالفيديوهات والقصص الإنسانية التي تروي واقع غزة بكرامة واحترافية.",
    platform_card1_desc_alt:
      "مكتبة غنية بالمحتوى الهادف الذي يسلّط الضوء على الواقع، ويمنح مساحة وصوت لمن لا صوت له .",
    platform_card2_title: "حاضنة صوت",
    platform_card2_desc:
      "برامج تدريبية متخصصة لتطوير مهارات صناع المحتوى وتمكينهم من الإبداع والنمو.",
    platform_card2_desc_alt:
      "برامج تدريبية متخصصة لتطوير مهارات صناع المحتوى وتمكينهم من الإبداع والتميز.",
    platform_card3_title: "صوت ميديا",
    platform_card3_desc:
      "شركة إنتاج إعلامي احترافية تقدم خدمات متكاملة من الكتابة إلى التسويق.",
    platform_card3_desc_alt:
      "حلول إعلامية متكاملة تجمع بين الإبداع، الإنتاج، والتسويق الرقمي.",
    stat_views_30m: "+30 مليون مشاهدة",
    stat_clips_100: "+100 مقطع",
    stat_clients_100: "+100 عميل راض",
    stat_projects_done: "مشاريع المنجزة",
    platform_stat_trainees: "+100 متدرب",
    platform_stat_projects: "+10 مشاريع منطلقة",
    platform_stat_creative: "+500 محتوى ابداعي",
    platform_stat_clients: "+100 عميل راضي",

    // Reels
    reel_title: "قصة أمل من غزة: كيف تحدى الحصار",
    reel_views: "200k مشاهدة",

    // Comments
    comments_full_label: "التعليقات (341)",
    comment_1: "قصة ملهمة رغم كل التحديات",
    comment_2: "حكاية بتعطي دافع للاستمرار",
    comment_3: "إصرار يستحق الاحترام",

    // Opinions
    opinion_user_name: "فرح حرز",
    opinion_user_location: "فلسطين - غزة",
    opinion_text:
      "تجربتي مع منصة صوت كانت مميزة جداً، حسيت إنها فعلاً تعطي مساحة حقيقية لكل شخص يعبّر عن أفكاره ويوصل صوته. الأدوات سهلة والاستخدام بسيط وكمان التفاعل مع المحتوى والمجتمع خلاني أكون جزء من بيئة إبداع.",

    user_1_name: "فرح حرز",
    user_1_location: "فلسطين - غزة",
    user_1_text:
      "تجربتي مع منصة صوت كانت مميزة جداً، حسيت إنها فعلاً تعطي مساحة حقيقية لكل شخص يعبّر عن أفكاره ويوصل صوته. الأدوات سهلة والاستخدام بسيط.",

    user_2_name: "محمود زعيتر",
    user_2_location: "فلسطين - الضفة",
    user_2_text:
      "منصة صوت غيّرت طريقة تعاملي مع المحتوى الرقمي، صار عندي مكان أعبّر فيه بحرية وأتواصل مع ناس بنفس الاهتمامات. تجربة ما توقعتها بهالمستوى.",

    user_3_name: "يوسف الدوس",
    user_3_location: "فلسطين - رام الله",
    user_3_text:
      "استخدمت المنصة من أول إطلاقها وشفت كيف تطورت. الفريق يسمع للمستخدمين فعلاً والتحديثات بتجي على أساس احتياجاتنا. هذا الشي نادر هالأيام.",

    user_4_name: "سارة العمر",
    user_4_location: "فلسطين - نابلس",
    user_4_text:
      "بدأت أستخدم صوت للتعبير عن أفكاري الإبداعية ولقيت مجتمع داعم ومتفاعل. المنصة بتعطيك إحساس إنك محاط بناس بتفهمك وبتشجعك تكمل.",

    user_5_name: "أحمد النجار",
    user_5_location: "فلسطين - جنين",
    user_5_text:
      "الواجهة سهلة والتجربة سلسة من أول دقيقة. ما احتجت أي مساعدة لأفهم كيف تشتغل المنصة. هذا دليل على اهتمام الفريق بتجربة المستخدم.",
    // Team members
    team_member_1: "هديل طافش",
    team_member_2: "محمد الأشقر",
    team_member_3: "محمود الصالح",
    team_member_4: "هديل طافش",
    team_member_5: "انس مليحة",
    view_profile_arrow: "عرض الملف الشخصي >",

    // Footer
    footer_rights_brand: "SAWTGAZA",
    footer_copyright: "© جميع الحقوق محفوظة. 2026",

    // Aria
    toggle_lang: "تغيير اللغة",

    // about page
    about_hero_title: "صناع الأثر.. الفريق خلف منصة صوت",
    about_hero_desc:
      "صوت منصة إعلامية مستقلة تُوثّق الواقع وتحكي قصص الناس، لتكون صوتاً لمن لا صوت له.",
    about_header: "من نحن",
    about_intro:
      "منصة صوت انطلقت من غزة، تؤمن بأن لكل إنسان قصة تستحق أن تُروى وصوتاً يستحق أن يُسمع ، نعمل على إنتاج محتوى إنساني وإعلامي هادف يوثّق الواقع وينقل قصص الناس وقضايا المجتمع بمهنية ومسؤولية ، نسعى إلى تسليط الضوء على الأصوات المهمّشة والحكايات التي قد لا تجد مكاناً في الإعلام التقليدي، إيماناً منا بأن الإعلام رسالة وأثر قبل أن يكون خبراً ، نروي القصص بصدق، وننقل الواقع كما هو، لنكون جسراً بين الإنسان وقضيته.",
    about_desc:
      " منصة إعلامية رقمية تجمع بين المحتوى الإنساني، التدريب الاحترافي، والإنتاج الإعلامي.",
    about_register: "سجل الآن",
    about_collaborate: "تعاون معنا",
    successful_members: "عضو ناجح",
    about_platform_title: "نبذة عن منصة صوت",
    about_platform_question: "ما الذي يدفعنا لنكون صوتك؟",
    about_platform_desc:
      "نؤمن أن لكل إنسان قصة تستحق أن تُروى، لذلك جاءت صوت لتكون مساحة حرة للتعبير، حيث يلتقي الأفراد لمشاركة تجاربهم وأفكارهم بصدق. نساعدك على إيصال صوتك إلى الآخرين، ونمنح المحتوى الإنساني مساحة حقيقية ليُرى، ويُسمع، ويترك أثرًا.",
    core_values_title:
      'أهم القيم التي <span class="core-values-highlight">نركز عليها</span>',
    core_values_subtitle:
      "قيمنا هي الأساس الذي نبني عليه صوت، وهي ما يقود طريقة عملنا وتطويرنا المستمر",
    core_value_1_title: "المصداقية",
    core_value_1_desc:
      "ننقل القصص والحقائق بدقة وموضوعية، ملتزمين بالتحقق من المعلومات واحترام ثقة جمهورنا.",
    core_value_2_title: "الإنسانية",
    core_value_2_desc:
      "نضع الإنسان في قلب كل قصة، ونؤمن بأن لكل فرد حقاً في أن يُسمع ويُمثَّل بكرامة واحترام.",
    core_value_3_title: "التأثير",
    core_value_3_desc:
      "نسعى لصناعة محتوى يرفع الوعي، ويُحدث أثراً إيجابياً في المجتمع، ويُحفّز التغيير نحو الأفضل.",
    core_value_4_title: "الاستقلالية",
    core_value_4_desc:
      "نلتزم بإعلام مستقل يعكس الواقع بصدق، بعيداً عن أي تحيزات أو أجندات تؤثر على رسالتنا",
    sawt_story_title: "قصة صوت",
    sawt_story_title_html: 'قصة <span class="sawt-story-highlight">صوت</span>',
    about_platform_question_html:
      'ما الذي يدفعنا لنكون <span class="platform-highlight">صوتك؟</span>',
    join_us_title: "لأن بعض الأصوات لا يجب أن تُنسى",
    join_us_desc:
      "مساهمتك ليست دعماً لمنصة إعلامية فحسب، بل دعماً لأصوات وقصص تنتظر من ينقلها",
    join_us_support: "مساهمة بإيصال صوت",
    sawt_story_subtitle: "من فكرة بسيطة إلى منصة تحمل قصص الناس وتنقل أصواتهم.",
    sawt_story_1_title: "التأثير",
    sawt_story_1_desc:
      "منذ انطلاقنا، استطعنا إيصال أصوات الآلاف من الأشخاص الذين كانوا صامتين، وكشفنا حقائق عديدة تم إخفاؤها عن الرأي العام. قصصنا وصلت لملايين المتابعين، وساهمت في لفت انتباه العالم إلى قضايا مهمشة.",
    sawt_story_2_title: "ما نقدم",
    sawt_story_2_desc:
      "نحن نقدم إعلامًا حقيقيًا يعتمد على القصص الحقيقية والأصوات الصادقة، بعيدًا عن ضغوط الإعلام التقليدي والسرديات الرسمية. منصاتنا تتيح لأي إنسان أن يُسمع صوته ويُسرد قصته بحرية ومصداقية، حيث نوثّق القصص الحقيقية من المناطق المتضررة.",
    sawt_story_3_title: "رحلتنا",
    sawt_story_3_desc:
      'بدأت رحلة "صوت" في ظل ظروف صعبة، حيث كانت الكثير من القصص الحقيقية مخفية والأصوات الصادقة مكتومة تحت ضغوط الإعلام التقليدي والسرديات الرسمية. آمنّا بأن الحقيقة تستحق أن تُروى، وكل إنسان يستحق أن يُسمع صوته.',
    join_our_team_title_pre: "قد تكون قصتك بداية",
    join_our_team_title_highlight: "التغيير",
    join_our_team_desc:
      "كل صوت مهم، إذا كانت لديك قصة تستحق أن تُسمع فإن صوت ستدعمك من أول محادثة إلى التأثير العام.",
    join_our_team_join: "انضم الينا",
    join_our_team_support: "ادعم فريق صوت",
    join_creator_title: "انضم إلينا كصانع محتوى",
    join_creator_desc:
      "صوت تجمع صناع المحتوى , كن صوت من لاصوت له",
    join_creator_btn: "طلب الانضمام",

    // Join creator modal
    jm_title: "انضم إلينا كصانع محتوى",
    jm_subtitle: "أخبرنا عن نفسك وسنتواصل معك قريباً",
    jm_step1: "المعلومات الشخصية",
    jm_step2: "تفاصيل المحتوى",
    jm_step3: "مواقع التواصل",
    jm_fullname: "الاسم الكامل",
    jm_fullname_ph: "محمد احمد",
    jm_phone: "رقم الهاتف",
    jm_phone_ph: "59999999",
    jm_email: "البريد الإلكتروني",
    jm_email_ph: "Mohamed@Gmail.Com",
    jm_content_type: "نوع المحتوى الذي تنتجه",
    jm_multi_hint: "*بإمكانك اختيار أكثر من خيار",
    jm_cat_other: "أخرى",
    jm_cat_culture: "ثقافة وفنون",
    jm_cat_politics: "سياسة",
    jm_cat_art: "فن وإبداع",
    jm_cat_tech: "تقنية وتكنولوجيا",
    jm_cat_social: "اجتماعية",
    jm_cat_comedy: "كوميدي وترفيهي",
    jm_cat_news: "إخبارية وتوعوية",
    jm_cat_health: "صحة ولياقة",
    jm_cat_sport: "رياضة وترفيه",
    jm_followers: "عدد المتابعين التقريبي في المنصة الواحدة (الأعلى شهرة)",
    jm_followers_ph: "5000",
    jm_about: "نبذة عن محتواك",
    jm_about_ph: "تحدث عن المحتوى الذي تقدمه وما الذي يميزك",
    jm_social_links: "روابط مواقع التواصل الاجتماعي",
    jm_add_platform: "اضافة منصة",
    jm_country_search: "ابحث عن دولة أو رمز…",
    jm_err_name: "الاسم مطلوب",
    jm_err_phone: "رقم الهاتف مطلوب",
    jm_err_email: "البريد الإلكتروني مطلوب",
    jm_err_email_invalid: "البريد الإلكتروني غير صحيح",
    jm_err_content: "اختر نوع المحتوى",
    jm_err_followers: "عدد المتابعين مطلوب",
    jm_err_about: "نبذة عن محتواك مطلوبة",
    jm_err_social: "أضف رابطاً واحداً على الأقل",
    jm_notes: "ملاحظات إضافية",
    jm_notes_ph: "أي معلومات إضافية تريد إضافتها إلينا",
    jm_next: "التالي",
    jm_prev: "السابق",
    jm_cancel: "الغاء",
    jm_submit: "تسليم الطلب",
    jm_success_title: "تم إرسال طلبك بنجاح",
    jm_success_text: "شكراً لك! سنراجع طلبك ونتواصل معك قريباً.",
    leaders: "قادة",
    teams: "الفرق",
    leaders_of_teams_subtitle: "الوجوه خلف الحكاية",
    story_title: "قصتنا",
    story_subtitle: "من الصمت... إلى صوت يُسمع",
    story_values: "قيمنا",
    story_journey: "رحلتنا",
    story_offer: "ما نقدم",
    story_impact: "التأثير",
    story_paragraph_values_1:
      'نؤمن أن <span class="highlight-word">المصداقية</span> هي الأساس، وأن كل قصة تُروى يجب أن تنطلق من احترام الإنسان وكرامته. قيمنا تنبع من إيماننا بأن الإعلام رسالة، وأن <span class="highlight-word">الصدق والشفافية</span> ليسا خيارًا، بل التزامًا.',
    story_paragraph_values_2:
      'نلتزم بحياد المعلومة، وعدالة التمثيل، وحماية الأصوات المهمشة. نعمل بروح الفريق، ونرفض أي تنازل عن <span class="highlight-word">المبادئ الإنسانية</span> التي قامت عليها منصة صوت.',
    story_paragraph_journey_1:
      'بدأت رحلة <span class="highlight-word">"صوت"</span> في ظل ظروفٍ صعبة، حيث كانت الكثير من القصص الحقيقية مخفية، <span class="highlight-word">والأصوات</span> الصادقة مكتومة تحت ضغوط الإعلام التقليدي والسرديات المُسيّسة. آمنّا بأن الحقيقة تستحق أن تُروى، وأن لكل إنسان الحق في أن يُسمع صوته.',
    story_paragraph_journey_2:
      'واجهنا تحدياتٍ كبيرة؛ من محدودية الموارد، وصعوبة الوصول إلى المناطق المتضررة، إلى محاولات التشكيك بالمصداقية. لكننا استمررنا، مدفوعين بإيمانٍ راسخ بأن الإعلام الحقيقي <span class="highlight-word">هو حقٌ للناس، وليس أداةً للسلطة</span>.',
    story_paragraph_offer_1:
      'نقدم <span class="highlight-word">محتوى إنسانيًا</span> يلامس القلب، ومنصةً للتدريب الإعلامي تُمكّن صناع المحتوى من امتلاك أدواتهم، إلى جانب إنتاج إعلامي يُترجم القصص إلى أعمال بصرية مؤثرة.',
    story_paragraph_offer_2:
      'من خلال <span class="highlight-word">حاضنة صوت</span> وذراعها الإنتاجية صوت ميديا، نوفر بيئةً متكاملة من الموارد والإرشاد والمنصات، حتى تصل كل قصة إلى جمهورها بأفضل صورة ممكنة.',
    story_paragraph_impact_1:
      'تجاوزت قصص صوت حدود المنصة لتصل إلى <span class="highlight-word">ملايين المشاهدات</span>، وتحوّلت إلى نقاشات عامة، وحملات مناصرة، ومبادرات ميدانية أحدثت فرقًا حقيقيًا.',
    story_paragraph_impact_2:
      'نقيس أثرنا بعدد <span class="highlight-word">الأصوات التي مكّنّاها</span>، لا بأرقام المتابعين فقط. كل تجربة نجاح تؤكد أن الإعلام الإنساني قادر على صناعة التغيير.',

    // Real stories (قصص من الواقع)
    realstories_title_pre: "قصص من",
    realstories_title_word: "الواقع",
    realstories_desc:
      "كلنا نملك قصة تستحق أن تُروى. في هذا القسم، نضع مساحة لك لتشارك قصتك الحقيقية. سواء كانت قصة نجاح، تحدي، إبداع، أو تجربة حياتية مؤثرة.",
    realstories_count: "+100 قصة واقعية نقلتها صوت الى العالم",
    realstories_input_placeholder: "شاركنا قصتك",
    rs_intro_title_pre: "هل لديك صوت يستحق أن",
    rs_intro_title_word: "يُسمع ؟",
    rs_intro_desc:
      "شاركنا قصتك أو قضيتك، وقد تكون القصة القادمة التي نسلّط الضوء عليها ليصل صوتها إلى العالم",
    rs_view_story: "عرض القصة",
    rs_badge: "قصة نجاح",
    rs_card_desc: "من غزة الى الأردن وأمل لايمشي مجددا",
    rs_card1_title: "أغلي كاسة شاي",
    rs_card2_title: "سمير البطل",
    rs_card1_full:
      "من قلب غزة المحاصرة، حوّل صانع المحتوى كوب الشاي البسيط إلى رمزٍ للصمود وسط الحصار. التقطت منصة صوت حكايته وأوصلتها إلى العالم، لتتحوّل كاسة شاي إلى رسالة أملٍ وإصرار.",
    rs_card2_full:
      "في وسط دمار غزة، اختُطف صانع المحتوى سمير وأُصيبت يده بوحشية، واضطر إلى الهجرة إلى الأردن بحثاً عن الأمان. منصة صوت التقطت صورته ونقلت قصته للعالم، فصار صوته أعلى من القنابل وحمل رسالة الأمل لآلاف الفلسطينيين.",

    // ===== Support page (ادعم صوت) =====
    nav_support: "ادعم صوت",
    support_hero_title: "ادعم المنصة التي توصل أصواتهم",
    support_hero_desc:
      "كل تبرع يتحوّل إلى قصة تُروى، وصوت يصل إلى العالم من قلب غزة",

    // Payment methods page (/support/methods)
    support_methods_breadcrumb: "طرق الدعم",
    support_methods_hero_title: "ادعم صوت",
    support_methods_hero_desc:
      "اختر الطريقة الأنسب لك لإتمام تبرعك، وكل مساهمة تتحول إلى قصة تُروى من قلب غزة",
    support_methods_title_pre: "اختر طريقة الدعم التي",
    support_methods_title_hl: "تناسبك",
    support_method_continue: "المتابعة",
    support_method_gateway_title: "دفع إلكتروني",
    support_method_gateway_desc:
      "يتم التبرع باستخدام بوابة دفع آمنة وسهلة الاستخدام، بحيث يقدر المتبرع إتمام العملية بسرعة وبطريقة موثوقة.",
    support_method_transfer_title: "تحويل مباشر",
    support_method_transfer_desc:
      "يتم التبرع من خلال بيانات حساب بنكي أو محفظة إلكترونية، ثم يقوم المتبرع بإرفاق إثبات التحويل ليتم توثيق التبرع.",
    support_method_crypto_title: "عملات رقمية",
    support_method_crypto_desc:
      "يتم التبرع باستخدام عملات رقمية مدعومة، مع إمكانية إرسال إثبات العملية بعد التحويل لتأكيد المساهمة.",

    // Donation wizard (/support/checkout)
    checkout_step_counter_pre: "الخطوة",
    checkout_step_counter_mid: "من",
    checkout_step_platform: "اختيار المنصة",
    checkout_step_proof: "إثبات التبرع",
    checkout_step_team: "دعم الفريق",
    checkout_step_contact: "وسيلة التواصل",
    checkout_pay_title: "اختر وسيلة الدفع",
    checkout_notes_title: "ملاحظات مهمة:",
    checkout_note_platform_pre: "لقد اخترت منصة",
    checkout_note_platform_post:
      "للدفع، وهي وسيلة دفع إلكترونية موثوقة وآمنة لإيصال مساهمتك إلينا بسهولة وسرعة.",
    checkout_note_no_extra_info:
      "لا يلزم إدخال أي معلومات غير مطلوبة داخل المنصة سوى بيانات الدفع الأساسية.",
    checkout_note_redirect:
      "في الخطوة التالية سيتم تحويلك مباشرة إلى صفحة الدفع لإتمام العملية.",
    checkout_notes_attach: "المرجو إرفاق هذه الفاتورة في المرفقات بالخطوة التالية.",
    checkout_prev: "السابق",
    checkout_next: "التالي",
    checkout_finish: "اتمام العملية",

    // Wizard step 2 — bank details (بيانات التحويل)
    checkout_transfer_title: "بيانات التحويل",
    checkout_field_bank: "اسم البنك",
    checkout_field_holder: "صاحب الحساب",
    checkout_field_account: "رقم الحساب",
    checkout_field_iban: "IBAN",
    checkout_copy: "نسخ",
    checkout_transfer_note: "سيتم تأكيد تبرعك خلال 1-3 أيام بعد استلام الإيصال",
    checkout_transfer_banner:
      "بعد اتمام التحويل ، يرجى الاحتفاظ بصورة الايصال أو رسالة التأكيد لارفاقها في الخطوة التالية",

    // Wizard step 2 — donation proof (إثبات تبرعك)
    checkout_proof_title: "إثبات تبرعك",
    checkout_proof_amount: "مبلغ التبرع",
    checkout_proof_currency: "نوع العملة المراد التبرع بيها",
    checkout_proof_currency_placeholder: "اختر عملة التبرع",
    checkout_currency_usd: "دولار أمريكي",
    checkout_currency_eur: "يورو",
    checkout_currency_ils: "شيكل",
    checkout_currency_jod: "دينار أردني",
    checkout_proof_drop_title: "اسحب و أفلت الصورة هنا",
    checkout_proof_browse_pre: "أو",
    checkout_proof_browse_link: "اضغط للتصفح",
    checkout_proof_browse_post: "من جهازك",
    checkout_proof_hint:
      "الحد الأقصى لحجم الملف المسموح به هو 5 ميجابايت، وتشمل الصيغ المدعومة png, jpg, pdf",
    checkout_proof_error_type:
      "الصيغة غير مدعومة، الرجاء رفع ملف png أو jpg أو pdf.",
    checkout_proof_error_size: "حجم الملف أكبر من 5 ميجابايت.",
    checkout_proof_remove: "إزالة",
    checkout_contact_title: "التواصل",
    checkout_contact_email: "البريد الالكتروني",
    checkout_contact_email_required:
      "الرجاء إدخال البريد الالكتروني للتواصل معك.",
    checkout_contact_email_invalid: "الرجاء إدخال بريد الكتروني صحيح.",
    checkout_contact_note:
      "شكرا لك، تم استلام بيانات التبرع بنجاح. سنقوم بالتواصل معك بعد تأكيد وصول الحوالة.",

    // Donation confirmation toast (shown on /support after the wizard)
    support_donation_toast:
      "شكرا لك، تم استلام بيانات التبرع بنجاح. سنقوم بالتواصل معك قريبًا لتأكيد التبرع.",
    support_donation_toast_close: "إغلاق",

    // Donate box
    support_donate_title_pre: "كيف تريد ان",
    support_donate_title_hl: "تدعم؟",
    support_donate_sub:
      "قيمنا هي الأساس الذي نبني عليه صوت، وهي ما يقود طريقة عملنا وتطويرنا المستمر",
    support_plan_once: "لمرة واحدة",
    support_plan_once_sub: "تبرع فوري بدون التزام",
    support_plan_monthly: "شهري",
    support_plan_monthly_sub: "دعم مستمر كل شهر",
    support_plan_yearly: "سنوي",
    support_plan_yearly_sub: "الأكثر تأثيرا",
    support_renew_monthly: "سيتم تجديدك شهريا للتجديد دعم صوت",
    support_renew_yearly: "سيتم تجديدك سنويا للتجديد دعم صوت",
    support_choose_amount: "اختر المبلغ",
    support_custom_amount: "أو أدخل مبلغ",
    support_custom_placeholder: "أدخل مبلغ خصيصا",
    support_donate_with: "تبرع بـ",
    support_pledge_title: "تبرعك يعني...",
    support_pledge_1: "قصة إنسانية جديدة أروى للعالم",
    support_pledge_2: "صحفي ميداني مدرب على الأرض",
    support_pledge_3: "تقرير مفحوص بحق لمتابعين",
    support_pledge_4: "أرشيف رقمي يحمي الذاكرة الجماعية",
    support_quote_text:
      "«كل تبرع يشجع فيه يعني قصة جديدة توصل للناس — قصة ما كانت تُسمع»",
    support_quote_name: "فريق صوت",
    support_quote_place: "غزة، فلسطين",

    // Banner
    support_banner_eyebrow: "قصص إنسانية من غزة",
    support_banner_title_pre: "ادعم المنصة التي توصل",
    support_banner_title_hl: "أصواتهم",
    support_banner_feature_1: "وصول فوري للمستحقين",
    support_banner_feature_2: "سهولة الدفع",
    support_banner_feature_3: "تبرع آمن ومشفر",
    support_banner_where: "أين تذهب تبرعاتي؟",
    support_donate_now: "تبرع الآن",
    support_badge_donors: "متبرع هذا الشهر",
    support_badge_stories: "قصة وثقت",

    // Live support community
    support_community_title_pre: "مجتمع الدعم",
    support_community_title_hl: "الحي",
    support_community_sub:
      "قيمنا هي الأساس الذي نبني عليه صوت، وهي ما يقود طريقة عملنا وتطويرنا المستمر",
    support_stat_goal: "هدف الشهر",
    support_stat_raised: "تم جمعه",
    support_stat_remaining: "متبقي",
    support_stat_progress: "الإنجاز",
    support_progress_note_pre: "نحتاج",
    support_progress_note_post: "لإتمام هدف الشهر — ساهم الآن",
    support_add_name_cta: "أضف اسمك للقائمة — تبرع الآن",

    // Where donations go
    support_alloc_title_pre: "أين تذهب",
    support_alloc_title_hl: "تبرعاتكم؟",
    support_alloc_sub: "كل دولار يُستثمر بمسؤولية — نُبلّغكم بكل تفصيلة لأن ثقتكم أمانة",
    support_alloc_creators_title: "تمكين المبدعين",
    support_alloc_media_title: "التوثيق والإعلام",
    support_alloc_education_title: "الدعم النفسي والتعليمي",
    support_alloc_desc:
      "دعم المبدعين الشباب في غزة بالأدوات والتدريب ليُنتجوا محتوى يُغيّر الرواية ويصنع أثراً حقيقياً.",
    support_alloc_item_1: "أدوات إنتاج احترافية",
    support_alloc_item_2: "منح للمواهب الصاعدة",
    support_alloc_item_3: "بيئة إبداعية آمنة ومحفّزة",
    support_alloc_of_total: "من إجمالي التبرعات",
    support_alloc_summary_title: "كل دولار له عنوان واضح",
    support_alloc_summary_sub:
      "نُصدر تقارير شهرية شاملة عن كيفية توزيع التبرعات — وبإمكانك طلب تقرير مفصّل في أي وقت.",
    support_alloc_summary_share: "من تبرعاتكم",
    support_alloc_summary_caption: "موزّع بشفافية",

    // Partners + funding CTA
    support_partners_title_pre: "شركاؤنا في نشر",
    support_partners_title_hl: "الصوت",
    support_partners_sub:
      "شكرا للمؤسسات والشركات التي تؤمن بمهمتنا وتصدر صوت أهل غزة للعالم",
    support_fund_title: "الحقيقة تحتاج من يمولها",
    support_fund_desc:
      "شراكات مؤسسية مع صوت — للجهات التي تريد أن يكون دورها في إيصال الحقيقة للعالم. انضم وأبق صوت غزة حيا",
    support_contact_us: "تواصل معنا",

    // Incubator courses
    support_courses_title_pre: "ساعد طلاب في الانضمام",
    support_courses_title_hl: "للحاضنة",
    support_courses_sub:
      "تكفل رسوم دورة بمبلغ بسيط يفتح باب المعرفة أمام شاب في غزة — تبرعك يصل مباشرة لتغطية تكاليف التدريب",
    support_course_field_title: "صحافة ميدانية",
    support_course_field_desc: "تدريب ميداني على التغطية الإخبارية في مناطق النزاع",
    support_course_podcast_title: "بودكاست وصوت",
    support_course_podcast_desc: "إنتاج محتوى صوتي احترافي يصل لملايين المستمعين",
    support_course_video_title: "إنتاج مرئي",
    support_course_video_desc: "إنتاج محتوى صوتي احترافي يصل لملايين المستمعين",
    support_course_weeks: "أسابيع",
    support_course_seats: "مقاعد",
    support_course_field_cta: "تكفل دورة صحافة ميدانية لطالب واحد بـ 120$",
    support_course_podcast_cta: "تكفل دورة بودكاست وصوت لطالب واحد بـ 120$",
    support_course_video_cta: "تكفل دورة إنتاج مرئي لطالب واحد بـ 120$",

    // Untold stories
    support_untold_title_pre: "أصوات لم نقدر على",
    support_untold_title_hl: "توصيلها",
    support_untold_sub:
      "هذه قصص حقيقية من غزة لم تصل للعالم ـ لأن الموارد نفدت قبل أن نكمل روايتها",
    support_untold_cta_title: "دعمك يمنع القصة القادمة من الضياع",
    support_untold_cta_desc: "تبرعك اليوم يضمن الصوت القادم لن يضيع",
    support_untold_cta_btn: "إدعم المنصة الآن",
    support_prev: "السابق",
    support_next: "التالي",

    // FAQ
    support_faq_title: "الأسئلة المتكررة",
    support_faq_q1: "كيف يمكنني التبرع؟",
    support_faq_a1:
      "اختر نوع الدعم (لمرة واحدة، شهري أو سنوي)، ثم حدد المبلغ أو أدخل مبلغا خاصا بك، واضغط زر التبرع لإتمام العملية.",
    support_faq_q2: "هل التبرع آمن؟",
    support_faq_a2:
      "عملية التبرع بسيطة جدا — اختر المبلغ وطريقة الدفع (بطاقة ائتمانية، PayPal، أو تحويل بنكي) واضغط «تبرع الآن». لن تأخذ أكثر من دقيقتين، ويصلك تأكيد فوري على بريدك الإلكتروني.",
    support_faq_q3: "هل يمكنني التبرع لمرة واحدة؟",
    support_faq_a3:
      "نعم، اختر تبويب «لمرة واحدة» وسيتم خصم المبلغ مرة واحدة فقط دون أي التزام أو تجديد تلقائي.",
    support_faq_q4: "كيف يتم استخدام التبرعات؟",
    support_faq_a4:
      "توزع التبرعات على ثلاثة محاور: تمكين المبدعين 40%، التوثيق والإعلام 35%، والدعم النفسي والتعليمي 25% — وننشر تقريرا شهريا بالتفاصيل.",
    support_faq_q5: "هل يمكنني إلغاء الاشتراك الشهري؟",
    support_faq_a5:
      "يمكنك إيقاف الدعم الشهري في أي وقت من صفحة حسابك أو بمراسلتنا على البريد الإلكتروني، ويسري الإلغاء فورا.",
    support_faq_more_title: "لديك سؤال آخر؟",
    support_faq_more_desc: "فريقنا جاهز للإجابة — سنردّ عليك خلال ساعات",

    // Incubator page (/incubator) — nav
    inc_brand: "حاضنة صوت",
    inc_nav_back: "العودة لمنصة صوت",
    inc_nav_courses: "الكورسات",
    inc_nav_workshops: "الورشات",
    inc_nav_cta: "ادعم طلاب الحاضنة",

    // Incubator — hero
    inc_hero_title_pre: "حوّل قصتك",
    inc_hero_title_mid: "إلى محتوى",
    inc_hero_title_post: "يصنع أثرًا",
    inc_hero_desc:
      "انضم إلى بيئة تدريبية تجمع بين التعلم العملي، والإرشاد، والمشاريع الواقعية لتساعدك على صناعة محتوى يترك أثرًا.",
    inc_hero_cta: "ابدأ رحلتك التعليمية",
    inc_hero_badge_donors: "متبرع هذا الشهر",
    inc_hero_badge_stories: "قصة وثّقت",
    inc_stat_students: "طالب مسجّل",
    inc_stat_trainers: "مدرب وخبير",
    inc_stat_satisfaction: "معدل رضاء الطلاب",
    inc_stat_graduates: "طالب متخرج",

    // Incubator — لماذا حاضنة صوت؟
    inc_why_title_pre: "لماذا حاضنة",
    inc_why_title_hl: "صوت",
    inc_why_desc:
      "حاضنة صوت ليست مجرد منصة تدريبية، بل رحلة متكاملة تساعدك على تحويل أفكارك وقصصك إلى محتوى مؤثر. من خلال التدريب العملي، والإرشاد المستمر، والمشاريع الواقعية، نمنحك البيئة المناسبة لتطوير مهاراتك وصناعة أثر حقيقي.",
    inc_why_practical_title: "تدريب عملي",
    inc_why_practical_desc: "تعلم من خلال التطبيق والممارسة",
    inc_why_mentorship_title: "إرشاد متخصص",
    inc_why_mentorship_desc: "أنجز مشاريع حقيقية تبني معرض أعمالك",
    inc_why_projects_title: "مشاريع واقعية",
    inc_why_projects_desc: "توجيه مستمر من خبراء في المجال",
    inc_why_reach_title: "إيصال صوتك",
    inc_why_reach_desc: "فرصة لنشر أعمالك والوصول إلى جمهور أوسع",

    // Incubator — دوراتنا الأكثر شهرة
    inc_courses_title_pre: "دوراتنا الأكثر",
    inc_courses_title_hl: "شهرة",
    inc_courses_sub:
      "دورات تدريبية شاملة، تعتمد على التطبيق والتنفيذ العملي، نبدأ معك من الصفر حتى تصل إلى الاحتراف لتؤهلك كل دورة لسوق العمل وتكون جاهزًا له.",
    inc_course_soon: "قريبًا",
    inc_course_tutor: "المدرب:",
    inc_course_details_cta: "تفاصيل الكورس",
    inc_course_waitlist_cta: "انضم لقائمة الانتظار",
    inc_course_level_low: "منخفض",
    inc_course_level_high: "مرتفع",
    inc_course_cat_design: "التصميم",
    inc_course_cat_marketing: "التسويق",
    inc_course_graphic_title: "تصميم الجرافيك",
    inc_course_graphic_duration: "15 ساعة",
    inc_course_graphic_hours: "4 ساعات",
    inc_course_data_title: "تحليل البيانات",
    inc_course_data_duration: "25 ساعة",
    inc_course_data_hours: "8 ساعات",
    inc_course_data_desc:
      "استراتيجيات فعالة لكتابة المحتوى الجذاب وزيادة التفاعل.استراتيجيات فعالة لكتابة المحتوى الجذاب وزيادة التفاعل.",
    inc_course_data_tutor: "أحمد الرفاعي",
    inc_course_marketing_title: "تسويق المحتوى الرقمي",
    inc_course_marketing_desc:
      "استراتيجيات فعالة لكتابة المحتوى الجذاب وزيادة التفاعل",

    // Incubator — فريق خبراء متخصص
    inc_experts_title_pre: "فريق خبراء",
    inc_experts_title_hl: "متخصص",
    inc_experts_sub: "أرقام حقيقية تعكس قوة مجتمعنا",
    inc_expert_tareq_name: "طارق الجبالي",
    inc_expert_tareq_badge: "7 سنوات",
    inc_expert_tareq_desc:
      "خبرة 7 سنوات في تطوير تطبيقات الهاتف المحمول. عمل على مشاريع مبتكرة في مجال التجارة الإلكترونية.",
    inc_expert_sumaya_name: "سمية الخطيب",
    inc_expert_sumaya_badge: "3 سنوات",
    inc_expert_sumaya_desc:
      "خبرة 3 سنوات في التسويق الرقمي وتحليل البيانات. ساهمت في زيادة نسبة المبيعات بنسبة 30%.",
    inc_expert_yousef_name: "يوسف العتيبي",
    inc_expert_yousef_badge: "10 سنوات",
    inc_expert_yousef_desc:
      "خبرة 10 سنوات في إدارة المشاريع وتطوير البرمجيات. قاد فريقًا في مشروع ضخم للذكاء الاصطناعي.",
    inc_expert_laila_name: "ليلى العبدالله",
    inc_expert_laila_badge: "5 سنوات",
    inc_expert_laila_desc:
      "خبرة 5 سنوات في تصميم الجرافيك وتطوير العلامات التجارية. عملت مع عدة شركات ناشئة.",
    inc_expert_ahmad_name: "أحمد المنصور",
    inc_expert_ahmad_badge: "+8 سنة",
    inc_expert_ahmad_desc:
      "خبرة +8 سنوات في إنتاج المحتوى الرقمي والإعلام الاجتماعي. أطلق أكثر من 200 قناة ناجحة.",

    // Incubator — ساعد طلاب في الانضمام للحاضنة
    inc_sponsor_title_pre: "ساعد طلاب في الانضمام",
    inc_sponsor_title_hl: "للحاضنة",
    inc_sponsor_sub:
      "مبلغ بسيط يفتح باب المعرفة أمام شاب في غزة — تبرّعك يصل مباشرة لتغطية تكاليف التدريب",
    inc_sponsor_weeks: "8 أسابيع",
    inc_sponsor_seats: "6 مقاعد",
    inc_sponsor_field_title: "صحافة ميدانية",
    inc_sponsor_field_desc: "تدريب ميداني على التغطية الإخبارية في مناطق النزاع",
    inc_sponsor_field_cta: "تكفّل دورة صحافة ميدانية لطالب واحد ب 120$",
    inc_sponsor_podcast_title: "بودكاست وصوت",
    inc_sponsor_podcast_desc: "إنتاج محتوى صوتي احترافي يصل لملايين المستمعين",
    inc_sponsor_podcast_cta: "تكفّل دورة بودكاست وصوت لطالب واحد ب 120$",
    inc_sponsor_writing_title: "كتابة إبداعية",
    inc_sponsor_writing_desc: "إنتاج محتوى صوتي احترافي يصل لملايين المستمعين",
    inc_sponsor_writing_cta: "تكفّل دورة كتابة إبداعية لطالب واحد ب 120$",
    inc_sponsor_video_title: "إنتاج مرئي",
    inc_sponsor_video_desc: "إنتاج محتوى صوتي احترافي يصل لملايين المستمعين",
    inc_sponsor_video_cta: "تكفّل دورة إنتاج مرئي لطالب واحد ب 120$",
    inc_sponsor_waiting_title: "طلاب ينتظرون داعماً",
    inc_sponsor_waiting_more: "+ 28 طالباً آخرين",
    inc_sponsor_student_reem: "ريم س.",
    inc_sponsor_student_reem_meta: "إنتاج مرئي · خانيونس",
    inc_sponsor_student_ahmad: "أحمد خ.",
    inc_sponsor_student_ahmad_meta: "صحافة ميدانية · غزة",
    inc_sponsor_student_yousef: "يوسف م.",
    inc_sponsor_student_yousef_meta: "بودكاست وصوت · رفح",
    inc_sponsor_impact_title: "أثر البرنامج",
    inc_sponsor_impact_stories: "قصة وثقت",
    inc_sponsor_impact_journalists: "صحفيون ميدانيون",
    inc_sponsor_impact_graduates: "أتموا دوراتهم",

    // Incubator — استكشف أحدث فعالياتنا
    inc_events_title_pre: "استكشف أحدث",
    inc_events_title_hl: "فعالياتنا",
    inc_events_sub: "أرقام حقيقية تعكس قوة مجتمعنا",
    inc_events_filter_all: "الكل",
    inc_events_filter_economy: "الاقتصاد (13)",
    inc_events_filter_war: "قصص الحرب (45)",
    inc_events_filter_business: "المال والأعمال(13)",
    inc_events_filter_news: "الاخبار (13)",
    inc_events_month_july: "يوليو",
    inc_event_innovation_date: "الثلاثاء 27/5/2026",
    inc_event_innovation_time: "11.00 مساء",
    inc_event_innovation_title:
      "ابتكار الحلول الإبداعية في تصميم واجهات المستخدم، الدليل النهائي للابتكار",
    inc_event_innovation_desc:
      "اكتشف كيفية تحويل الأفكار إلى تصميمات فعالة. تعلم استراتيجيات جديدة لتعزيز الإبداع في عملك.",
    inc_event_innovation_type: "وجاهي,ندوة",
    inc_event_tools_date: "الاثنين 26/5/2026",
    inc_event_tools_time: "10.00 مساء",
    inc_event_tools_title:
      "كيفية استخدام أدوات التصميم الحديثة لتحقيق نتائج مذهلة",
    inc_event_tools_desc:
      "استفد من أحدث التطورات في أدوات التصميم لتحسين سرعة وكفاءة العمل. تعرف على كيفية استخدام أدوات التعاونية......",
    inc_event_tools_type: "أونلاين,ندوة",
    inc_event_ux_date: "الأحد 25/5/2026",
    inc_event_ux_time: "09.30 مساء",
    inc_event_ux_title:
      "الاستراتيجيات الفعالة لتحسين تجربة المستخدم، دالدليل الشامل لتحسين الأداء",
    inc_event_ux_desc:
      "تعلم كيفية استخدام البيانات لتحسين تصاميمك وجعلها أكثر جاذبية. اكتشف كيفية دمج التعليقات في تحسين الجودة.",
    inc_event_ux_type: "وجاهي ,ورشة عمل",

    // Incubator — الحاضنة بيتك الثاني ، البوم الحاضنة
    inc_album_title_pre: "الحاضنة بيتك الثاني ،",
    inc_album_title_hl: "البوم الحاضنة",
    inc_album_sub:
      "مبلغ بسيط يفتح باب المعرفة أمام شاب في غزة — تبرّعك يصل مباشرة لتغطية تكاليف التدريب",
    inc_album_launch_chip: "يوم الإطلاق — الدفعة الثالثة",
    inc_album_final_caption: "الدفعة تسجّل مشاريعها النهائية",
    inc_album_workshop_title: "ورشة عمل — التسويق بالمحتوى",
    inc_album_workshop_sub: "كل جلسة عملية لا محاضرات نظرية",
    inc_album_mentor_chip: "جلسة مرشد 1:1",
    inc_album_community_chip: "مجتمع صانعي المحتوى",

    // Incubator — FAQ
    inc_faq_title_pre: "الأسئلة التي",
    inc_faq_title_hl: "تدور ببالك؟",
    inc_faq_sub: "أرقام حقيقية تعكس قوة مجتمعنا",
    inc_faq_q1: "هل يمكنني نشر أعمالي بعد التدريب؟",
    inc_faq_a1:
      "نعم، ستنهي البرنامج بمشاريع حقيقية جاهزة للنشر، وسنساعدك على عرضها عبر منصات صوت لتصل إلى جمهور أوسع.",
    inc_faq_q2: "هل أحتاج خبرة مسبقة للتقديم؟",
    inc_faq_a2:
      "لا، البرنامج يبدأ معك من الأساسيات — كل ما نطلبه هو الالتزام والشغف بالتعلم.",
    inc_faq_q3: "هل البرنامج نظري أم عملي؟",
    inc_faq_a3:
      "البرنامج عملي بشكل كامل، حيث سنقوم بتطبيق كل ما نتعلمه عبر مشاريع حقيقية.",
    inc_faq_q4: "هل يمكنني نشر أعمالي بعد التدريب؟",
    inc_faq_a4:
      "بالتأكيد — أعمالك ملكك، ويمكنك نشرها على منصاتك الخاصة أو من خلال مجتمع الحاضنة متى شئت.",
    inc_faq_q5: "هل أحصل على شهادة بعد الانتهاء؟",
    inc_faq_a5:
      "نعم، تحصل عند إتمام البرنامج على شهادة معتمدة من حاضنة صوت توثّق المهارات والمشاريع التي أنجزتها.",

    // Incubator — graduates' employers
    inc_grads_title_pre: "يعمل خريجونا لدى",
    inc_grads_title_hl: "جهات موثوقة",
    inc_grads_sub: "نفخر بتميز خريجينا وحصولهم على وظائف مرموقة في جهات عالمية",

    // Incubator — join banner
    inc_join_title: "ابدأ رحلتك مع حاضنة صوت",
    inc_join_desc:
      "حوّل فكرتك إلى محتوى مؤثر، وطوّر مهاراتك من خلال التدريب العملي والإرشاد المتخصص، واصنع مشروعًا يعكس صوتك ويصل إلى الآخرين.",
    inc_join_btn: "انضم إلى الحاضنة",

    // Incubator — graduates' testimonials
    inc_testi_title_pre: "شهادات وتجارب",
    inc_testi_title_hl: "خريجينا",
    inc_testi_sub:
      "اكتشف كيف غيّرت حاضنة صوت حياة المئات من الطلاب الذين بدأوا رحلتهم من الصفر وأصبحوا اليوم محترفين مطلوبين في سوق العمل.",
    inc_testi_sara_quote:
      "التوجيه الذي تلقيته من المرشدين كان له تأثير كبير على مسيرتي. نصائحهم القيمة ساعدتني في اتخاذ قرارات مدروسة في مشاريعي.",
    inc_testi_sara_cta: "انضم إلينا",
    inc_testi_sara_name: "سارة القحطاني",
    inc_testi_sara_meta: "مخترعة — تقنية",
    inc_testi_fahd_quote:
      "التحديات التي واجهتها أثناء العمل في الحاضنة كانت محفزة لتطوير مهاراتي. التفاعل مع فرق متعددة التخصصات أضاف بعدًا جديدًا لرؤيتي .",
    inc_testi_fahd_cta: "استكشف الفرص",
    inc_testi_fahd_name: "فهد النعيمي",
    inc_testi_fahd_meta: "محلل بيانات — تقنية",
    inc_testi_reem_quote:
      "بيئة الحاضنة الداعمة منحتني الثقة لعرض أعمالي أمام جمهور حقيقي. اليوم أدير مشروعي الخاص وأتعاون مع علامات تجارية أعتز بها.",
    inc_testi_reem_cta: "ابدأ رحلتك",
    inc_testi_reem_name: "ريم العتيبي",
    inc_testi_reem_meta: "مصممة جرافيك — إبداع",
    inc_testi_khaled_quote:
      "ورش العمل التطبيقية علمتني كيف أحول الفكرة إلى محتوى حقيقي يصل للجمهور. خلال أشهر قليلة أطلقت قناتي الأولى بثقة كاملة.",
    inc_testi_khaled_cta: "انضم إلينا",
    inc_testi_khaled_name: "خالد الشمري",
    inc_testi_khaled_meta: "صانع محتوى — إعلام",
    inc_testi_noura_quote:
      "الحاضنة لم تمنحني المهارات فقط، بل شبكة علاقات فتحت لي أبواباً لم أكن أتخيلها. اليوم أقود مشروعاً ناشئاً بفريق متكامل.",
    inc_testi_noura_cta: "استكشف الفرص",
    inc_testi_noura_name: "نورة السالم",
    inc_testi_noura_meta: "رائدة أعمال — ريادة",
    inc_testi_yousef_quote:
      "المتابعة المستمرة من فريق الحاضنة جعلتني ألتزم بأهدافي حتى النهاية. تخرجت ومعي مشروع جاهز أضفته مباشرة إلى معرض أعمالي.",
    inc_testi_yousef_cta: "ابدأ رحلتك",
    inc_testi_yousef_name: "يوسف الحمد",
    inc_testi_yousef_meta: "مطور ويب — تقنية",
  },

  en: {
    // Top bar
    follow_us: "Follow us :",
    email: "info@sawtgaza.com",
    phone: "+972567247177",
    register_account: "Create Account",
    sign_in: "Sign In",

    // Nav
    nav_home: "Home",
    nav_about: "About",
    nav_content: "Our Content",
    nav_team: "Team",
    nav_creators: "Content Creators",
    nav_incubator: "Sawt Incubator",
    nav_media: "Sawt Media",
    search_placeholder: "Search here...",
    search_not_found: "No results on this page",

    // Our Content page (/content)
    content_hero_desc:
      "Behind every piece of content you watch and hear is a team of information-technology and media-production specialists. We believe technology is our means of carrying the truth, and that our creativity is the voice that takes Gaza's echo to the far horizons of the world.",
    content_cat_all: "All",
    content_cat_economy: "Economy (13)",
    content_cat_war: "War Stories (45)",
    content_cat_business: "Money & Business (13)",
    content_cat_news: "News (13)",
    content_sort_label: "Sort",
    content_sort_newest: "Newest to oldest",
    content_sort_oldest: "Oldest to newest",
    content_sort_views: "Most watched",
    content_most_watched_pre: "Most",
    content_most_watched_hl: "Watched",
    content_view_more: "View more",

    // Content Creators page
    brand_sawt: "Sawt",
    creators_hero_title: "Content Creators at Sawt",
    creators_hero_desc:
      "Meet the content creators at Sawt, where every idea has a voice, and every creator has a story.",
    creators_grid_count: "+47",
    creators_grid_title_pre: "successful content creators at",
    creators_grid_sub:
      "Meet the content creators at Sawt, where every idea has a voice, and every creator has a story.",
    creators_card_name: "Mahmoud Abdullah Zaiter",
    creators_card_role: "Stage Actor",
    creators_followers: "followers",
    creators_stats_title_pre: "Achievements of",
    creators_stats_title_mid: "content creators at",
    creators_stats_sub: "Real numbers that reflect the power of our community",
    creators_stat_reach: "people reached",
    creators_stat_funding: "financial support distributed",
    creators_stat_ads: "collaborative ads delivered",
    creators_stat_active: "active content creators",
    creators_join_title: "Join us as a content creator",
    creators_join_desc:
      "Sawt brings content creators together — be a voice for the voiceless",
    creators_join_btn: "Request to join",
    creators_companies_title_pre: "Advertising",
    creators_companies_title_hl: "companies",
    creators_companies_title_post: "that collaborated with content creators at",
    creators_companies_sub:
      "Thanks to the companies that carried the voice of Gaza's people to the world",
    creators_company_name: "Ebdaa Company",
    creators_collab_title_pre: "How does collaboration with",
    creators_collab_title_hl: "Sawt's content creators begin?",
    creators_collab_sub:
      "We connect companies from around the world with content creators in Gaza — Sawt Media is the bridge that reaches you",
    creators_flow_brands: "Companies & Brands",
    creators_flow_brands_sub: "worldwide",
    creators_flow_media: "Sawt Media",
    creators_flow_trusted: "The official trusted intermediary",
    creators_flow_creators: "Content Creators",
    creators_flow_creators_sub: "Creators of Gaza & Palestine",
    creators_steps_title: "Collaboration steps",
    creators_step_1_title: "Search & choose",
    creators_step_1:
      "Browse our creators' profiles and filter by specialty, budget, and audience reach",
    creators_step_2_title: "Connect & align",
    creators_step_2:
      "The Sawt Media team handles full coordination between you and the creator — from details to contract",
    creators_step_3_title: "Launch & measure",
    creators_step_3:
      "Content is produced and published, and you get a detailed report on results, reach, and engagement",
    creators_collab_cta: "Contact Sawt Media to contract content creators",
    creators_faq_title_pre: "The questions on",
    creators_faq_title_hl: "your mind?",
    creators_faq_title_post: "Here are the answers",
    creators_faq_title_mobile: "Frequently asked questions",
    creators_faq_sub: "Everything you need to know before starting your journey with Sawt",
    creators_faq_q1: "How can I join as a content creator?",
    creators_faq_a1:
      "Register your account via the “Request to join” button, complete your profile and add samples of your work, and the Sawt team will contact you to finalize activation.",
    creators_faq_q2: "Is payment guaranteed for collaborative ads?",
    creators_faq_a2:
      "The payment process is very simple — reserve the amount and payment method (credit card, PayPal, or bank transfer) and press “Distribute now.” It takes no more than two minutes, and you get instant confirmation by email.",
    creators_faq_q3: "How do companies choose the right content creator?",
    creators_faq_a3:
      "Companies browse creators' profiles and filter by specialty, audience, and budget, while the Sawt Media team handles shortlisting and coordination to ensure the best match.",
    creators_faq_q4: "Can I join from any country?",
    creators_faq_a4:
      "Yes, joining is open to content creators from Palestine and the Arab world, with priority given to amplifying Gaza's voices.",
    creators_faq_q5: "Are there any fees to join the platform?",
    creators_faq_a5:
      "Joining is completely free, and Sawt takes only a small percentage upon completing a successful advertising collaboration.",
    one_thousand: "K",
    // Hero
    hero_title: "Sawt Platform",
    hero_subtitle:
      "Telling Gaza's stories with dignity, building a new generation of content creators.",
    hero_trust:
      "Trusted by thousands of followers on Sawt Gaza with honesty and impact",
    hero_btn_watch: "Support Sawt",
    hero_btn_collab: "Collaborate With Us",
    hero_btn_support: "Support Sawt",

    // Stats
    stat_team: "Team Members",
    stat_followers: "Followers",
    stat_views: "Views",
    stat_videos: "Videos",
    stat_stories: "Stories",

    // Sout section
    who_we_are: "Who We Are",
    sout_intro_subtitle: "Purposeful media, real stories, and lasting impact",
    sout_main_title: "We believe every person has a story worth telling",
    sout_description:
      "We carry people's stories and the causes of their community from a human and professional perspective. We work to document reality and bring forward the stories that may never find their way to traditional media — believing that every person has a voice that deserves to be heard, and a story that deserves to be told, through:",
    sout_feature_1: "Content that expresses your voice",
    sout_feature_2: "Empowering young talent",
    sout_feature_3: "Media production and coverage",
    sout_feature_4: "Creating real and lasting impact",
    welcome_label: "Welcome to Sawt",
    welcome_title: "Every idea has a voice... and Sawt brings them together",
    welcome_lead: "At Sawt, every idea finds its place!",
    welcome_desc:
      "Explore diverse content, express yourself, and share your voice with the world. Through an interactive experience full of creativity and inspiration, you can develop your ideas and reach a wider audience — and Sawt is with you step by step to make your voice reach further.",
    feature_voice: "A space for your voices",
    feature_creativity: "Empowering creativity",
    feature_publish: "Services that make publishing easier.",
    feature_empower_creativity: "A space to empower creativity",
    feature_expert_team: "An expert team supporting you",
    feature_express_voice: "Content that expresses your voice",
    support_creators: "We support content creators",
    professional_team:
      "A professional team, distinguished content, and services that help your voice reach further",
    discover_more: "Discover More",

    // News section
    news_title_pre: "Our Latest",
    news_title_highlight: "News",
    news_subtitle: "Watch the latest stories and videos from Sawt platform",
    view_all_news: "View All News",

    // Creators section
    creators_title_pre: "Content",
    creators_title_highlight: "Creators",
    creators_title_full: "Content Creators at Sawt",
    creators_title_main: "Content Creators",
    at_sawt: "at Sawt",
    creators_subtitle:
      "Meet the content creators at Sawt, where every idea has a voice, and every creator has a story.",
    creators_desc_main:
      "A group of creative content makers who use their skills to produce purposeful, impactful content.",
    view_all: "View All",

    // Platform sections
    platform_title_pre: "Platform",
    platform_title_highlight: "Sections",
    platform_subtitle:
      "Every idea has a voice... and Sawt brings them together",
    platform_sections_subtitle:
      "Specialized sections that come together to fulfil our mission in media, development, and creating impact",
    read_more: "Read More",

    // Partners
    partners_title_pre: "Our Partners in",
    partners_title_highlight: "Sawt",
    partners_title_main: "Our Partners",
    partners_desc:
      "Together we build a living voice — a space that gathers stories, ignites hope, and gives every person a chance to be heard.",
    partners_subtitle2:
      "Partners who share with us the journey of impact and change.",
    be_partner: "Become a Sawt Partner",

    // Stories
    stories_label: "Real-life Stories",
    stories_title:
      "Discover real experiences from people who shared their stories with us",
    tell_story: "Tell Your Story",
    reviews_title_pre: "Your feedback on",
    reviews_title_pre2: "Your views on",
    reviews_title_highlight: "the content",
    reviews_trust_html:
      'We take pride in <span class="hl">the trust</span> of our audience, and we value every opinion that helps shape our media mission.',
    reviews_desc:
      "We believe your feedback is an essential part of our growth and service improvement. Share your experience and suggestions and help us deliver a better experience that meets your needs and expectations.",
    reviews_desc_html:
      'We believe <span class="hl">your feedback</span> is an essential part of our growth and service improvement. Share your experience and suggestions and help us deliver a better experience that meets your needs and expectations.',
    comments_word: "Comments",
    you_label: "You",
    now_label: "now",
    reply_label: "Reply",
    reply_placeholder: "Write a reply...",
    comments_count_label: "Comments",
    tab_oldest: "Oldest",
    tab_newest: "Newest",
    comment_placeholder: "Leave your comment here...",
    show_more: "Show more ↓",
    show_less: "Show less ↑",

    // Opinions
    opinions_label: "User Opinions",
    opinions_title:
      "We believe your opinion is part of our growth. Share your experience and help us become better.",
    share_opinion: "Share Your Opinion",

    user_1_name: "Farah Harz",
    user_1_location: "Palestine - Gaza",
    user_1_text:
      "My experience with Sawt platform was very special. It truly gives a real space for everyone to express their thoughts and share their voice. The tools are easy and simple to use.",

    user_2_name: "Mahmoud Zuaiter",
    user_2_location: "Palestine - West Bank",
    user_2_text:
      "Sawt changed the way I deal with digital content. I finally have a place to express myself freely and connect with people who share the same interests.",

    user_3_name: "Yousef Al-Dos",
    user_3_location: "Palestine - Ramallah",
    user_3_text:
      "I used the platform since its launch and saw how it evolved. The team truly listens to users, and updates are based on our needs.",

    user_4_name: "Sara Al-Omar",
    user_4_location: "Palestine - Nablus",
    user_4_text:
      "I started using Sawt to express my creative ideas and found a supportive and interactive community that motivates me to continue.",

    user_5_name: "Ahmed Al-Najjar",
    user_5_location: "Palestine - Jenin",
    user_5_text:
      "The interface is simple and the experience is smooth from the first moment. I didn’t need any help to understand how it works.",

    // Team
    team_title_pre: "Our",
    team_title_highlight: "Team",
    team_subtitle: "Meet the Sawt team — creators who make a difference",
    view_profile: "View Profile",

    // Team page (/team)
    team_hero_title: "The Impact Makers — The Team Behind Sawt",
    team_cat_all: "All",
    team_cat_design: "Design Team",
    team_cat_marketing: "Marketing Team",
    team_cat_management: "Management Team",
    team_cat_montage: "Editing Team",
    team_card_name: "Samir Al-Batal",
    team_card_role: "UI/UX Designer",
    team_detail_experience: "5 years of experience",
    team_detail_about_title: "About",
    team_detail_bio:
      "Specialized in transforming complex ideas and visions into (UI/UX) experiences. A digital interface and user-experience designer with over 5 years of experience in understanding user behavior and analyzing their needs. In my work I focus on striking the perfect balance between interface aesthetics and the highest standards of usability and accessibility. My professional passion for the Sawt Gaza team reflects my belief in the importance of media technology; I work on developing and designing the platform's interfaces to be the visual and digital bridge that ensures creative content and human stories flow seamlessly and at the highest possible quality.",
    team_detail_follow: "Follow us :",
    team_members_title: "Team Members",
    team_members_title_pre: "Team",
    team_members_title_highlight: "Members",

    // Footer
    footer_about:
      "Sawt platform was founded to be a space for creators — bringing together the Incubator, Sawt Media, and the voice itself — to deliver inspiring content and unique experiences for everyone who wants their voice to be heard.",
    footer_main_sections: "Main Sections",
    footer_quick_links: "Quick Links",
    footer_backstage: "Backstage",
    footer_media_kit: "MEDIA KIT",
    footer_impact_stories: "Impact Stories",
    footer_blog: "Blog",
    footer_faq: "FAQ",
    footer_stay_updated: "Stay Updated",
    footer_subscribe: "Subscribe to our newsletter..",
    footer_email_placeholder: "Enter your email",
    footer_rights: "© All rights reserved. 2026",
    footer_privacy: "Privacy Policy",
    footer_terms: "Terms of Use",

    // Sout description (multi-line)
    welcome_desc_line1:
      "Explore diverse content, express yourself, and share your voice with the world.",
    welcome_desc_line2:
      "Through an interactive experience full of creativity and inspiration, you can develop your ideas and reach",
    welcome_desc_line3: "a wider audience.",
    welcome_desc_line4:
      "Sawt is with you step by step to make your voice reach further.",

    // News cards
    news_card1_title: "Content Creator in Gaza",
    news_card2_title: "Mothers in Gaza",
    news_card3_title: "Amputees: A Marginalized Cause",
    news_desc:
      "We share the latest updates about content creators in Gaza, where we work to highlight creators' stories and amplify their voices.",
    news_date: "March 5, 2026",
    news_duration: "10 min",

    // Creators cards
    creator_share: "Share with Sawt",
    creator_name: "Mahmoud Abdullah Zeiter",
    creator_role: "Stage Actor",
    creator_followers: "31.4K followers",
    creator_bio: "Palestinian content creator and comedian from the Gaza Strip",
    creator_quote:
      "My experience with Sawt was different — finally, a place that understands me as a creator....",
    creator_overlay_title: "My Experience with Sawt",
    view_more: "View More",

    // Creator detail page (/creators/[id])
    creator_detail_name: "Mahmoud Abdullah Zeiter",
    creator_detail_bio:
      "A content creator specialized in theater and performing arts, seeking to deliver purposeful, meaningful cultural content",
    creator_detail_follow: "Follow",
    creator_detail_follow_me: "Follow me on:",
    creator_detail_stat_views: "views",
    creator_detail_stat_followers: "followers",
    creator_detail_stat_videos: "videos",
    creator_content_cat_all: "All",
    creator_content_cat_economy: "Economy (13)",
    creator_content_cat_business: "Money & Business (13)",
    creator_content_cat_war: "War Stories (45)",
    creator_content_cat_news: "News (13)",
    creator_collab_title: "Top Collaborations",
    creator_collab_title_1: "Top",
    creator_collab_title_2: "Collaborations",
    creator_collab_desc:
      "Sawt content creators have left their mark with local and international companies,",
    creator_collab_c1: "Ibda' Production Company",
    creator_collab_c1_sub: "Media production",
    creator_collab_c1_title: "Ad for Ibda' Company",
    creator_collab_c1_views: "200k views",
    creator_collab_c1_quote:
      '"Mahmoud has a rare ability to turn an idea into an impactful visual experience. Working with him was one of our most successful production experiences."',
    creator_collab_c1_author: "Rana Al-Saleh",
    creator_collab_c1_role: "Production Manager",
    creator_collab_c2: "Arab Art Foundation",
    creator_collab_c2_sub: "Arts & culture",
    creator_collab_c2_title: "Arab Art Campaign",
    creator_collab_c2_views: "150k views",
    creator_collab_c2_quote:
      '"Working with Mahmoud was a refined artistic experience; he translates our cultural vision into visual content that resonates with the audience."',
    creator_collab_c2_author: "Sami Al-Ali",
    creator_collab_c2_role: "Creative Director",
    creator_collab_c3: "Al-Ufuq Satellite Channel",
    creator_collab_c3_sub: "TV broadcasting",
    creator_collab_c3_title: "Al-Ufuq Channel Promo",
    creator_collab_c3_views: "320k views",
    creator_collab_c3_quote:
      '"High professionalism in execution and punctuality. Mahmoud added a distinctive touch to our media identity."',
    creator_collab_c3_author: "Heba Kamal",
    creator_collab_c3_role: "Programs Manager",
    creator_collab_c4: "Modern Publishing House",
    creator_collab_c4_sub: "Publishing & content",
    creator_collab_c4_title: "Publishing House Campaign",
    creator_collab_c4_views: "90k views",
    creator_collab_c4_quote:
      '"His ability to craft content and tie it to imagery made our projects more impactful and far-reaching."',
    creator_collab_c4_author: "Khaled Mansour",
    creator_collab_c4_role: "Editor-in-Chief",
    creator_collab_c5: "Tech Media Company",
    creator_collab_c5_sub: "Media technology",
    creator_collab_c5_title: "Tech Media Ad",
    creator_collab_c5_views: "500k views",
    creator_collab_c5_quote:
      '"Blending technology with creativity is what sets Mahmoud apart; our collaboration achieved view counts beyond our expectations."',
    creator_collab_c5_author: "Lina Fouad",
    creator_collab_c5_role: "Marketing Manager",

    // Platform cards
    platform_card1_title: "Content Platform",
    platform_card1_name: "Sawt Platform",
    platform_card1_desc:
      "A rich library of videos and human stories that tell the reality of Gaza with dignity and professionalism.",
    platform_card1_desc_alt:
      "A rich library of purposeful content that shines a light on reality, and gives space and a voice to the voiceless.",
    platform_card2_title: "Sawt Incubator",
    platform_card2_desc:
      "Specialized training programs to develop content creators' skills and enable them to create and grow.",
    platform_card2_desc_alt:
      "Specialized training programs to develop content creators' skills and enable them to create and excel.",
    platform_card3_title: "Sawt Media",
    platform_card3_desc:
      "A professional media production company offering full services from writing to marketing.",
    platform_card3_desc_alt:
      "Integrated media solutions combining creativity, production, and digital marketing.",
    stat_views_30m: "+30M views",
    stat_clips_100: "+100 clips",
    stat_clients_100: "+100 satisfied clients",
    stat_projects_done: "Completed projects",
    platform_stat_trainees: "+100 trainees",
    platform_stat_projects: "+10 launched projects",
    platform_stat_creative: "+500 creative works",
    platform_stat_clients: "+100 satisfied clients",

    // Reels
    reel_title: "A story of hope from Gaza: defying the siege",
    reel_views: "200k views",

    // Comments
    comments_full_label: "Comments (341)",
    comment_1: "An inspiring story despite all challenges",
    comment_2: "A story that gives motivation to keep going",
    comment_3: "Determination that deserves respect",

    // Opinions
    opinion_user_name: "Farah Harz",
    opinion_user_location: "Palestine — Gaza",
    opinion_text:
      "My experience with Sawt platform was very special. I felt it truly gives a real space for everyone to express their thoughts and share their voice. The tools are easy, the experience is simple, and the interaction with the content and community made me part of a creative environment.",

    // Team members
    team_member_1: "Hadeel Tafesh",
    team_member_2: "Mohammed Al-Ashqar",
    team_member_3: "Mahmoud Al-Saleh",
    team_member_4: "Hadeel Tafesh",
    team_member_5: "Anas Mlaiha",
    view_profile_arrow: "View Profile >",

    // Footer
    footer_rights_brand: "SAWTGAZA",
    footer_copyright: "© All rights reserved. 2026",

    // Aria
    toggle_lang: "Switch language",

    //about page
    about_hero_title: "Impact Makers.. The Team Behind Sawt Platform",
    about_hero_desc:
      "Sawt is an independent media platform that documents reality and tells people's stories, to be a voice for those who have none.",
    about_header: "About Sawt",
    about_intro:
      "Sawt was launched from Gaza, believing that every person has a story worth telling and a voice that deserves to be heard. We produce purposeful human and media content that documents reality and carries people's stories and the causes of their community with professionalism and responsibility. We seek to shine a light on marginalized voices and the stories that may find no place in traditional media — believing that media is a message and an impact before it is a news item. We tell stories honestly and convey reality as it is, to be a bridge between a person and their cause.",
    about_desc:
      "A digital media platform that combines humanitarian content, professional training, and media production.",
    about_register: "Register Now",
    about_collaborate: "Collaborate With Us",
    successful_members: "Successful Member",
    about_platform_title: "About Sawt Platform",
    about_platform_question: "What drives us to be your voice?",
    about_platform_desc:
      "We believe every person has a story worth telling. That's why Sawt was created as a free space for expression, where individuals come together to share their experiences and ideas with sincerity. We help you reach others with your voice, giving humanitarian content a real space to be seen, heard, and leave a lasting impact.",
    core_values_title:
      'The Core Values We <span class="core-values-highlight">Focus On</span>',
    core_values_subtitle:
      "Our values are the foundation on which we build Sawt, and they guide the way we work and continuously improve.",
    core_value_1_title: "Credibility",
    core_value_1_desc:
      "We convey stories and facts accurately and objectively, committed to verifying information and honoring the trust of our audience.",
    core_value_2_title: "Humanity",
    core_value_2_desc:
      "We put the human being at the heart of every story, and believe every individual has the right to be heard and represented with dignity and respect.",
    core_value_3_title: "Impact",
    core_value_3_desc:
      "We strive to create content that raises awareness, makes a positive difference in the community, and drives change for the better.",
    core_value_4_title: "Independence",
    core_value_4_desc:
      "We are committed to independent media that reflects reality honestly, free from any bias or agenda that could affect our mission.",
    sawt_story_title: "The Story of Sawt",
    sawt_story_title_html:
      'The Story of <span class="sawt-story-highlight">Sawt</span>',
    about_platform_question_html:
      'What drives us to be <span class="platform-highlight">your voice?</span>',
    join_us_title: "Because some voices must never be forgotten",
    join_us_desc:
      "Your contribution is not only support for a media platform — it is support for voices and stories waiting for someone to carry them.",
    join_us_support: "Contribute to Carrying a Voice",
    sawt_story_subtitle:
      "From a simple idea to a platform that carries people's stories and conveys their voices.",
    sawt_story_1_title: "Impact",
    sawt_story_1_desc:
      "Since we began, we have managed to carry the voices of thousands of people who were silenced, and uncovered many facts that were hidden from public opinion. Our stories have reached millions of followers and helped draw the world's attention to marginalized issues.",
    sawt_story_2_title: "What We Offer",
    sawt_story_2_desc:
      "We provide genuine media built on real stories and honest voices, away from the pressures of traditional media and official narratives. Our platforms allow anyone to have their voice heard and their story told freely and credibly, as we document real stories from affected areas.",
    sawt_story_3_title: "Our Journey",
    sawt_story_3_desc:
      'The journey of "Sawt" began under difficult circumstances, when many real stories were hidden and honest voices were muted under the pressures of traditional media and official narratives. We believed that the truth deserves to be told, and that every person deserves to have their voice heard.',
    leaders: "Leaders",
    teams: "Of Teams",
    leaders_of_teams_subtitle: "The faces behind the story",
    join_our_team_title_pre: "Your story could be the start of",
    join_our_team_title_highlight: "change",
    join_our_team_desc:
      "Every voice matters. If you have a story worth hearing, Sawt will support you from the first conversation to public impact.",
    join_our_team_join: "Join Us",
    join_our_team_support: "Support Sawt Team",
    join_creator_title: "Join us as a content creator",
    join_creator_desc:
      "Voice of the Content Creators Association, be the voice of the voiceless",
    join_creator_btn: "Request to Join",

    // Join creator modal
    jm_title: "Join us as a content creator",
    jm_subtitle: "Tell us about yourself and we'll get in touch soon",
    jm_step1: "Personal Information",
    jm_step2: "Content Details",
    jm_step3: "Social Media",
    jm_fullname: "Full Name",
    jm_fullname_ph: "Mohamed Ahmed",
    jm_phone: "Phone Number",
    jm_phone_ph: "59999999",
    jm_email: "Email Address",
    jm_email_ph: "Mohamed@Gmail.Com",
    jm_content_type: "Type of content you produce",
    jm_multi_hint: "*You can choose more than one option",
    jm_cat_other: "Other",
    jm_cat_culture: "Culture & Arts",
    jm_cat_politics: "Politics",
    jm_cat_art: "Art & Creativity",
    jm_cat_tech: "Tech & Technology",
    jm_cat_social: "Social",
    jm_cat_comedy: "Comedy & Entertainment",
    jm_cat_news: "News & Awareness",
    jm_cat_health: "Health & Fitness",
    jm_cat_sport: "Sports & Leisure",
    jm_followers: "Approximate followers on your top platform",
    jm_followers_ph: "5000",
    jm_about: "About your content",
    jm_about_ph: "Tell us about the content you create and what makes you unique",
    jm_social_links: "Social media links",
    jm_add_platform: "Add platform",
    jm_country_search: "Search country or code…",
    jm_err_name: "Name is required",
    jm_err_phone: "Phone number is required",
    jm_err_email: "Email is required",
    jm_err_email_invalid: "Invalid email address",
    jm_err_content: "Select a content type",
    jm_err_followers: "Number of followers is required",
    jm_err_about: "A short bio about your content is required",
    jm_err_social: "Add at least one link",
    jm_notes: "Additional notes",
    jm_notes_ph: "Any additional information you'd like to share with us",
    jm_next: "Next",
    jm_prev: "Previous",
    jm_cancel: "Cancel",
    jm_submit: "Submit request",
    jm_success_title: "Your request has been sent successfully",
    jm_success_text: "Thank you! We'll review your request and contact you soon.",
    story_title: "Our Story",
    story_subtitle: "From silence... to a voice that is heard",
    story_values: "Our Values",
    story_journey: "Our Journey",
    story_offer: "What We Offer",
    story_impact: "Our Impact",
    story_paragraph_values_1:
      'We believe <span class="highlight-word">credibility</span> is the foundation, and that every story we tell must spring from respect for the human being. Our values come from the conviction that journalism is a mission, and that <span class="highlight-word">honesty and transparency</span> are not options — they are commitments.',
    story_paragraph_values_2:
      'We commit to neutrality of information, fairness of representation, and protection of marginalized voices. We work as a team and refuse any compromise on the <span class="highlight-word">human principles</span> Sawt was built on.',
    story_paragraph_journey_1:
      'The journey of <span class="highlight-word">"Sawt"</span> began under difficult circumstances, where many real stories were hidden and <span class="highlight-word">honest voices</span> were silenced under the pressure of traditional media and politicized narratives. We believed that truth deserves to be told, and that every person has the right to be heard.',
    story_paragraph_journey_2:
      'We faced great challenges: limited resources, the difficulty of reaching affected areas, and attempts to undermine our credibility. But we continued, driven by an unshakable belief that real journalism <span class="highlight-word">is a right of the people, not a tool of authority</span>.',
    story_paragraph_offer_1:
      'We deliver <span class="highlight-word">human-centered content</span> that touches the heart, a media training platform that empowers content creators with the tools they need, and media production that turns stories into impactful visual work.',
    story_paragraph_offer_2:
      'Through the <span class="highlight-word">Sawt Incubator</span> and its production arm Sawt Media, we provide an integrated environment of resources, mentorship, and platforms — so every story reaches its audience in the best form possible.',
    story_paragraph_impact_1:
      'Sawt\'s stories have reached <span class="highlight-word">millions of views</span> and turned into public conversations, advocacy campaigns, and on-the-ground initiatives that have made a real difference.',
    story_paragraph_impact_2:
      'We measure impact by the number of <span class="highlight-word">voices we have empowered</span>, not by follower counts alone. Every success story confirms that human-centered media can shape change.',

    // Real stories
    realstories_title_pre: "Stories from",
    realstories_title_word: "Reality",
    realstories_desc:
      "We all have a story worth telling. In this section, we give you space to share your real story — whether it's a story of success, challenge, creativity, or an impactful life experience.",
    realstories_count: "+100 real stories Sawt shared with the world",
    realstories_input_placeholder: "Share your story",
    rs_intro_title_pre: "Do you have a voice that deserves",
    rs_intro_title_word: "to be heard?",
    rs_intro_desc:
      "Share your story or your cause with us — it could be the next story we spotlight, so its voice reaches the world.",
    rs_view_story: "View story",
    rs_badge: "Success story",
    rs_card_desc: "From Gaza to Jordan, and a hope to walk again",
    rs_card1_title: "The most expensive cup of tea",
    rs_card2_title: "Samir the hero",
    rs_card1_full:
      "From the heart of besieged Gaza, a content creator turned a simple cup of tea into a symbol of resilience under siege. Sawt captured his story and carried it to the world, turning a cup of tea into a message of hope and determination.",
    rs_card2_full:
      "Amid the destruction of Gaza, content creator Samir was abducted and his hand brutally injured, forcing him to flee to Jordan in search of safety. Sawt captured his image and carried his story to the world, making his voice louder than the bombs and a message of hope for thousands of Palestinians.",

    // ===== Support page =====
    nav_support: "Support Sawt",
    support_hero_title: "Support the platform that carries their voices",
    support_hero_desc:
      "Every donation becomes a story told, and a voice that reaches the world from the heart of Gaza",

    // Payment methods page (/support/methods)
    support_methods_breadcrumb: "Support methods",
    support_methods_hero_title: "Support Sawt",
    support_methods_hero_desc:
      "Pick the option that suits you best to complete your donation — every contribution becomes a story told from the heart of Gaza",
    support_methods_title_pre: "Choose the support method that",
    support_methods_title_hl: "suits you",
    support_method_continue: "Continue",
    support_method_gateway_title: "Online payment",
    support_method_gateway_desc:
      "Donate through a secure, easy-to-use payment gateway, so you can complete the transaction quickly and reliably.",
    support_method_transfer_title: "Direct transfer",
    support_method_transfer_desc:
      "Donate using bank account or e-wallet details, then attach the transfer receipt so the donation can be verified.",
    support_method_crypto_title: "Digital currencies",
    support_method_crypto_desc:
      "Donate using supported digital currencies, with the option to send proof of the transaction afterwards to confirm your contribution.",

    // Donation wizard (/support/checkout)
    checkout_step_counter_pre: "Step",
    checkout_step_counter_mid: "of",
    checkout_step_platform: "Choose platform",
    checkout_step_proof: "Donation proof",
    checkout_step_team: "Support the team",
    checkout_step_contact: "Contact details",
    checkout_pay_title: "Choose a payment method",
    checkout_notes_title: "Important notes:",
    checkout_note_platform_pre: "You picked",
    checkout_note_platform_post:
      "as your payment platform — a trusted, secure online payment method that gets your contribution to us quickly and easily.",
    checkout_note_no_extra_info:
      "No information beyond the basic payment details is required inside the platform.",
    checkout_note_redirect:
      "In the next step you will be taken straight to the payment page to complete the transaction.",
    checkout_notes_attach:
      "Please attach this invoice in the next step's attachments.",
    checkout_prev: "Previous",
    checkout_next: "Next",
    checkout_finish: "Complete the process",

    // Wizard step 2 — bank details (بيانات التحويل)
    checkout_transfer_title: "Transfer details",
    checkout_field_bank: "Bank name",
    checkout_field_holder: "Account holder",
    checkout_field_account: "Account number",
    checkout_field_iban: "IBAN",
    checkout_copy: "Copy",
    checkout_transfer_note:
      "Your donation will be confirmed within 1-3 days of the receipt reaching us",
    checkout_transfer_banner:
      "Once the transfer is done, please keep a picture of the receipt or the confirmation message to attach in the next step",

    // Wizard step 2 — donation proof (إثبات تبرعك)
    checkout_proof_title: "Your donation proof",
    checkout_proof_amount: "Donation amount",
    checkout_proof_currency: "Currency you want to donate in",
    checkout_proof_currency_placeholder: "Choose a currency",
    checkout_currency_usd: "US dollar",
    checkout_currency_eur: "Euro",
    checkout_currency_ils: "Shekel",
    checkout_currency_jod: "Jordanian dinar",
    checkout_proof_drop_title: "Drag and drop the image here",
    checkout_proof_browse_pre: "or",
    checkout_proof_browse_link: "browse",
    checkout_proof_browse_post: "from your device",
    checkout_proof_hint:
      "The maximum file size is 5MB, and the supported formats are png, jpg, pdf",
    checkout_proof_error_type:
      "Unsupported format — please upload a png, jpg or pdf file.",
    checkout_proof_error_size: "The file is larger than 5MB.",
    checkout_proof_remove: "Remove",
    checkout_contact_title: "Contact",
    checkout_contact_email: "Email address",
    checkout_contact_email_required:
      "Please enter the email address we can reach you on.",
    checkout_contact_email_invalid: "Please enter a valid email address.",
    checkout_contact_note:
      "Thank you — your donation details were received. We will contact you once the transfer is confirmed.",

    // Donation confirmation toast (shown on /support after the wizard)
    support_donation_toast:
      "Thank you — your donation details were received. We will contact you shortly to confirm the donation.",
    support_donation_toast_close: "Close",

    // Donate box
    support_donate_title_pre: "How would you like",
    support_donate_title_hl: "to support?",
    support_donate_sub:
      "Our values are the foundation Sawt is built on — they drive how we work and how we keep improving",
    support_plan_once: "One time",
    support_plan_once_sub: "Instant donation, no commitment",
    support_plan_monthly: "Monthly",
    support_plan_monthly_sub: "Ongoing support every month",
    support_plan_yearly: "Yearly",
    support_plan_yearly_sub: "The most impactful",
    support_renew_monthly: "Your support for Sawt will renew monthly",
    support_renew_yearly: "Your support for Sawt will renew yearly",
    support_choose_amount: "Choose an amount",
    support_custom_amount: "Or enter an amount",
    support_custom_placeholder: "Enter a custom amount",
    support_donate_with: "Donate",
    support_pledge_title: "Your donation means...",
    support_pledge_1: "A new human story told to the world",
    support_pledge_2: "A trained field journalist on the ground",
    support_pledge_3: "A verified report for our followers",
    support_pledge_4: "A digital archive protecting collective memory",
    support_quote_text:
      "“Every donation means a new story reaching people — a story that would never have been heard”",
    support_quote_name: "The Sawt team",
    support_quote_place: "Gaza, Palestine",

    // Banner
    support_banner_eyebrow: "Human stories from Gaza",
    support_banner_title_pre: "Support the platform that carries",
    support_banner_title_hl: "their voices",
    support_banner_feature_1: "Reaches beneficiaries instantly",
    support_banner_feature_2: "Easy payment",
    support_banner_feature_3: "Secure, encrypted donation",
    support_banner_where: "Where do my donations go?",
    support_donate_now: "Donate now",
    support_badge_donors: "donors this month",
    support_badge_stories: "stories documented",

    // Live support community
    support_community_title_pre: "The living support",
    support_community_title_hl: "community",
    support_community_sub:
      "Our values are the foundation Sawt is built on — they drive how we work and how we keep improving",
    support_stat_goal: "Monthly goal",
    support_stat_raised: "Raised",
    support_stat_remaining: "Remaining",
    support_stat_progress: "Progress",
    support_progress_note_pre: "We need",
    support_progress_note_post: "to reach this month's goal — contribute now",
    support_add_name_cta: "Add your name to the list — donate now",

    // Where donations go
    support_alloc_title_pre: "Where do your",
    support_alloc_title_hl: "donations go?",
    support_alloc_sub:
      "Every dollar is invested responsibly — we report every detail, because your trust is a trust",
    support_alloc_creators_title: "Empowering creators",
    support_alloc_media_title: "Documentation & media",
    support_alloc_education_title: "Psychological & educational support",
    support_alloc_desc:
      "Supporting young creators in Gaza with tools and training so they can produce content that changes the narrative and makes real impact.",
    support_alloc_item_1: "Professional production tools",
    support_alloc_item_2: "Grants for rising talent",
    support_alloc_item_3: "A safe, motivating creative space",
    support_alloc_of_total: "of total donations",
    support_alloc_summary_title: "Every dollar has a clear destination",
    support_alloc_summary_sub:
      "We publish comprehensive monthly reports on how donations are distributed — and you can request a detailed report at any time.",
    support_alloc_summary_share: "of your donations",
    support_alloc_summary_caption: "distributed transparently",

    // Partners + funding CTA
    support_partners_title_pre: "Our partners in spreading",
    support_partners_title_hl: "the voice",
    support_partners_sub:
      "Thank you to the institutions and companies that believe in our mission and carry the voice of Gaza to the world",
    support_fund_title: "The truth needs funding",
    support_fund_desc:
      "Institutional partnerships with Sawt — for organisations that want a role in carrying the truth to the world. Join us and keep Gaza's voice alive",
    support_contact_us: "Contact us",

    // Incubator courses
    support_courses_title_pre: "Help students join",
    support_courses_title_hl: "the incubator",
    support_courses_sub:
      "Sponsoring a course costs little and opens the door of knowledge for a young person in Gaza — your donation goes straight to training costs",
    support_course_field_title: "Field journalism",
    support_course_field_desc:
      "Field training on news coverage in conflict zones",
    support_course_podcast_title: "Podcast & audio",
    support_course_podcast_desc:
      "Producing professional audio content that reaches millions of listeners",
    support_course_video_title: "Video production",
    support_course_video_desc:
      "Producing professional audio content that reaches millions of listeners",
    support_course_weeks: "weeks",
    support_course_seats: "seats",
    support_course_field_cta: "Sponsor a field journalism seat for $120",
    support_course_podcast_cta: "Sponsor a podcast & audio seat for $120",
    support_course_video_cta: "Sponsor a video production seat for $120",

    // Untold stories
    support_untold_title_pre: "Voices we couldn't",
    support_untold_title_hl: "carry",
    support_untold_sub:
      "These are real stories from Gaza that never reached the world — because the resources ran out before we could finish telling them",
    support_untold_cta_title: "Your support keeps the next story from being lost",
    support_untold_cta_desc:
      "Donating today makes sure the next voice is not lost",
    support_untold_cta_btn: "Support the platform now",
    support_prev: "Previous",
    support_next: "Next",

    // FAQ
    support_faq_title: "Frequently asked questions",
    support_faq_q1: "How can I donate?",
    support_faq_a1:
      "Choose the type of support (one-time, monthly or yearly), then pick an amount or enter your own, and press the donate button to complete the process.",
    support_faq_q2: "Is donating safe?",
    support_faq_a2:
      "Donating is very simple — choose the amount and payment method (credit card, PayPal, or bank transfer) and press “Donate now”. It takes no more than two minutes, and you get instant confirmation by email.",
    support_faq_q3: "Can I donate just once?",
    support_faq_a3:
      "Yes — choose the “One time” tab and the amount is charged once only, with no commitment or automatic renewal.",
    support_faq_q4: "How are donations used?",
    support_faq_a4:
      "Donations are split across three areas: empowering creators 40%, documentation & media 35%, and psychological & educational support 25% — and we publish a monthly report with the details.",
    support_faq_q5: "Can I cancel the monthly subscription?",
    support_faq_a5:
      "You can stop monthly support at any time from your account page or by emailing us, and the cancellation takes effect immediately.",
    support_faq_more_title: "Have another question?",
    support_faq_more_desc: "Our team is ready to answer — we'll reply within hours",

    // Incubator page (/incubator) — nav
    inc_brand: "Sawt Incubator",
    inc_nav_back: "Back to Sawt platform",
    inc_nav_courses: "Courses",
    inc_nav_workshops: "Workshops",
    inc_nav_cta: "Support incubator students",

    // Incubator — hero
    inc_hero_title_pre: "Turn your story",
    inc_hero_title_mid: "into content",
    inc_hero_title_post: "that makes an impact",
    inc_hero_desc:
      "Join a training environment that blends hands-on learning, mentorship and real projects to help you create content that leaves a mark.",
    inc_hero_cta: "Start your learning journey",
    inc_hero_badge_donors: "donors this month",
    inc_hero_badge_stories: "stories documented",
    inc_stat_students: "enrolled students",
    inc_stat_trainers: "trainers & experts",
    inc_stat_satisfaction: "student satisfaction",
    inc_stat_graduates: "graduates",

    // Incubator — Why Sawt Incubator?
    inc_why_title_pre: "Why the Sawt",
    inc_why_title_hl: "Incubator",
    inc_why_desc:
      "The Sawt Incubator is not just a training platform — it is a complete journey that helps you turn your ideas and stories into impactful content. Through hands-on training, continuous mentorship and real projects, we give you the right environment to grow your skills and make a genuine impact.",
    inc_why_practical_title: "Hands-on training",
    inc_why_practical_desc: "Learn by applying and practising",
    inc_why_mentorship_title: "Specialised mentorship",
    inc_why_mentorship_desc: "Deliver real projects that build your portfolio",
    inc_why_projects_title: "Real projects",
    inc_why_projects_desc: "Continuous guidance from experts in the field",
    inc_why_reach_title: "Get your voice heard",
    inc_why_reach_desc:
      "A chance to publish your work and reach a wider audience",

    // Incubator — Our most popular courses
    inc_courses_title_pre: "Our most popular",
    inc_courses_title_hl: "courses",
    inc_courses_sub:
      "Comprehensive training courses built on practice and real execution. We start with you from zero until you reach a professional level, so every course prepares you for the job market.",
    inc_course_soon: "Soon",
    inc_course_tutor: "Trainer:",
    inc_course_details_cta: "Course details",
    inc_course_waitlist_cta: "Join the waiting list",
    inc_course_level_low: "Beginner",
    inc_course_level_high: "Advanced",
    inc_course_cat_design: "Design",
    inc_course_cat_marketing: "Marketing",
    inc_course_graphic_title: "Graphic design",
    inc_course_graphic_duration: "15 hours",
    inc_course_graphic_hours: "4 hours",
    inc_course_data_title: "Data analysis",
    inc_course_data_duration: "25 hours",
    inc_course_data_hours: "8 hours",
    inc_course_data_desc:
      "Effective strategies for writing engaging content and boosting interaction. Effective strategies for writing engaging content and boosting interaction.",
    inc_course_data_tutor: "Ahmed Al-Rifai",
    inc_course_marketing_title: "Digital content marketing",
    inc_course_marketing_desc:
      "Effective strategies for writing engaging content and boosting interaction",

    // Incubator — a specialized expert team
    inc_experts_title_pre: "A team of specialized",
    inc_experts_title_hl: "experts",
    inc_experts_sub: "Real numbers that reflect the strength of our community",
    inc_expert_tareq_name: "Tariq Al-Jabali",
    inc_expert_tareq_badge: "7 years",
    inc_expert_tareq_desc:
      "7 years of experience in mobile app development. Worked on innovative projects in e-commerce.",
    inc_expert_sumaya_name: "Sumaya Al-Khatib",
    inc_expert_sumaya_badge: "3 years",
    inc_expert_sumaya_desc:
      "3 years of experience in digital marketing and data analysis. Helped raise sales by 30%.",
    inc_expert_yousef_name: "Yousef Al-Otaibi",
    inc_expert_yousef_badge: "10 years",
    inc_expert_yousef_desc:
      "10 years of experience in project management and software development. Led a team on a huge AI project.",
    inc_expert_laila_name: "Laila Al-Abdullah",
    inc_expert_laila_badge: "5 years",
    inc_expert_laila_desc:
      "5 years of experience in graphic design and brand development. Worked with several startups.",
    inc_expert_ahmad_name: "Ahmed Al-Mansour",
    inc_expert_ahmad_badge: "8+ years",
    inc_expert_ahmad_desc:
      "8+ years of experience in digital content production and social media. Launched more than 200 successful channels.",

    // Incubator — Help students join the incubator
    inc_sponsor_title_pre: "Help students join",
    inc_sponsor_title_hl: "the incubator",
    inc_sponsor_sub:
      "A small amount opens the door of knowledge for a young person in Gaza — your donation goes straight to covering training costs",
    inc_sponsor_weeks: "8 weeks",
    inc_sponsor_seats: "6 seats",
    inc_sponsor_field_title: "Field journalism",
    inc_sponsor_field_desc:
      "Field training in news coverage inside conflict zones",
    inc_sponsor_field_cta: "Sponsor a field journalism course for one student — $120",
    inc_sponsor_podcast_title: "Podcast & audio",
    inc_sponsor_podcast_desc:
      "Producing professional audio content that reaches millions of listeners",
    inc_sponsor_podcast_cta: "Sponsor a podcast & audio course for one student — $120",
    inc_sponsor_writing_title: "Creative writing",
    inc_sponsor_writing_desc:
      "Producing professional audio content that reaches millions of listeners",
    inc_sponsor_writing_cta: "Sponsor a creative writing course for one student — $120",
    inc_sponsor_video_title: "Video production",
    inc_sponsor_video_desc:
      "Producing professional audio content that reaches millions of listeners",
    inc_sponsor_video_cta: "Sponsor a video production course for one student — $120",
    inc_sponsor_waiting_title: "Students waiting for a sponsor",
    inc_sponsor_waiting_more: "+ 28 more students",
    inc_sponsor_student_reem: "Reem S.",
    inc_sponsor_student_reem_meta: "Video production · Khan Younis",
    inc_sponsor_student_ahmad: "Ahmad Kh.",
    inc_sponsor_student_ahmad_meta: "Field journalism · Gaza",
    inc_sponsor_student_yousef: "Yousef M.",
    inc_sponsor_student_yousef_meta: "Podcast & audio · Rafah",
    inc_sponsor_impact_title: "Programme impact",
    inc_sponsor_impact_stories: "stories documented",
    inc_sponsor_impact_journalists: "field journalists",
    inc_sponsor_impact_graduates: "completed their courses",

    // Incubator — استكشف أحدث فعالياتنا
    inc_events_title_pre: "Explore our latest",
    inc_events_title_hl: "events",
    inc_events_sub: "Real numbers that reflect the strength of our community",
    inc_events_filter_all: "All",
    inc_events_filter_economy: "Economy (13)",
    inc_events_filter_war: "War stories (45)",
    inc_events_filter_business: "Finance & business (13)",
    inc_events_filter_news: "News (13)",
    inc_events_month_july: "July",
    inc_event_innovation_date: "Tuesday 27/5/2026",
    inc_event_innovation_time: "11.00 PM",
    inc_event_innovation_title:
      "Inventing creative solutions in UI design — the ultimate guide to innovation",
    inc_event_innovation_desc:
      "Discover how to turn ideas into effective designs. Learn new strategies to boost creativity in your work.",
    inc_event_innovation_type: "In-person, seminar",
    inc_event_tools_date: "Monday 26/5/2026",
    inc_event_tools_time: "10.00 PM",
    inc_event_tools_title:
      "How to use modern design tools to achieve stunning results",
    inc_event_tools_desc:
      "Benefit from the latest advances in design tools to improve speed and efficiency. Learn how to use collaborative tools......",
    inc_event_tools_type: "Online, seminar",
    inc_event_ux_date: "Sunday 25/5/2026",
    inc_event_ux_time: "09.30 PM",
    inc_event_ux_title:
      "Effective strategies for improving user experience — the complete guide to better performance",
    inc_event_ux_desc:
      "Learn how to use data to improve your designs and make them more attractive. Discover how to fold feedback into better quality.",
    inc_event_ux_type: "In-person, workshop",

    // Incubator — the incubator album
    inc_album_title_pre: "The incubator is your second home,",
    inc_album_title_hl: "the incubator album",
    inc_album_sub:
      "A small amount opens the door of knowledge for a young person in Gaza — your donation goes straight to covering training costs",
    inc_album_launch_chip: "Launch day — third cohort",
    inc_album_final_caption: "The cohort records their final projects",
    inc_album_workshop_title: "Workshop — content marketing",
    inc_album_workshop_sub: "Every session is hands-on, no theory lectures",
    inc_album_mentor_chip: "1:1 mentor session",
    inc_album_community_chip: "Content creators community",

    // Incubator — FAQ
    inc_faq_title_pre: "The questions on",
    inc_faq_title_hl: "your mind?",
    inc_faq_sub: "Real numbers that reflect the strength of our community",
    inc_faq_q1: "Can I publish my work after the training?",
    inc_faq_a1:
      "Yes — you finish the program with real, publish-ready projects, and we help you showcase them across Sawt's platforms to reach a wider audience.",
    inc_faq_q2: "Do I need prior experience to apply?",
    inc_faq_a2:
      "No, the program starts from the basics — all we ask for is commitment and a passion for learning.",
    inc_faq_q3: "Is the program theoretical or practical?",
    inc_faq_a3:
      "The program is fully hands-on: we apply everything we learn through real projects.",
    inc_faq_q4: "Can I publish my work after the training?",
    inc_faq_a4:
      "Absolutely — your work is yours, and you can publish it on your own platforms or through the incubator community anytime.",
    inc_faq_q5: "Do I get a certificate upon completion?",
    inc_faq_a5:
      "Yes, on completing the program you receive a certificate accredited by the Sawt incubator documenting the skills and projects you delivered.",

    // Incubator — graduates' employers
    inc_grads_title_pre: "Our graduates work at",
    inc_grads_title_hl: "trusted organizations",
    inc_grads_sub:
      "We take pride in our graduates' excellence and the prestigious positions they hold at global organizations",

    // Incubator — join banner
    inc_join_title: "Start your journey with the Sawt incubator",
    inc_join_desc:
      "Turn your idea into impactful content, develop your skills through hands-on training and specialized mentorship, and craft a project that reflects your voice and reaches others.",
    inc_join_btn: "Join the incubator",

    // Incubator — graduates' testimonials
    inc_testi_title_pre: "Testimonials and stories of",
    inc_testi_title_hl: "our graduates",
    inc_testi_sub:
      "Discover how the Sawt incubator changed the lives of hundreds of students who started their journey from scratch and are now sought-after professionals in the job market.",
    inc_testi_sara_quote:
      "The guidance I received from the mentors had a huge impact on my journey. Their valuable advice helped me make well-considered decisions in my projects.",
    inc_testi_sara_cta: "Join us",
    inc_testi_sara_name: "Sara Al-Qahtani",
    inc_testi_sara_meta: "Inventor — Tech",
    inc_testi_fahd_quote:
      "The challenges I faced while working in the incubator pushed me to grow my skills. Collaborating with multidisciplinary teams added a whole new dimension to my vision.",
    inc_testi_fahd_cta: "Explore opportunities",
    inc_testi_fahd_name: "Fahd Al-Nuaimi",
    inc_testi_fahd_meta: "Data analyst — Tech",
    inc_testi_reem_quote:
      "The incubator's supportive environment gave me the confidence to present my work to a real audience. Today I run my own project and collaborate with brands I'm proud of.",
    inc_testi_reem_cta: "Start your journey",
    inc_testi_reem_name: "Reem Al-Otaibi",
    inc_testi_reem_meta: "Graphic designer — Creative",
    inc_testi_khaled_quote:
      "The hands-on workshops taught me how to turn an idea into real content that reaches an audience. Within a few months I launched my first channel with full confidence.",
    inc_testi_khaled_cta: "Join us",
    inc_testi_khaled_name: "Khaled Al-Shammari",
    inc_testi_khaled_meta: "Content creator — Media",
    inc_testi_noura_quote:
      "The incubator gave me more than skills — a network that opened doors I never imagined. Today I lead a startup with a complete team.",
    inc_testi_noura_cta: "Explore opportunities",
    inc_testi_noura_name: "Noura Al-Salem",
    inc_testi_noura_meta: "Entrepreneur — Startups",
    inc_testi_yousef_quote:
      "The incubator team's constant follow-up kept me committed to my goals until the very end. I graduated with a finished project that went straight into my portfolio.",
    inc_testi_yousef_cta: "Start your journey",
    inc_testi_yousef_name: "Yousef Al-Hamad",
    inc_testi_yousef_meta: "Web developer — Tech",
  },
};

const LANG_KEY = "lang";

export function getCurrentLang() {
  return localStorage.getItem(LANG_KEY) || "ar";
}

function setLang(lang) {
  localStorage.setItem(LANG_KEY, lang);
}

export function applyTranslations(lang) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.getAttribute("data-i18n-html");
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (translations[lang][key]) {
      el.setAttribute("placeholder", translations[lang][key]);
    }
  });

  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    const key = el.getAttribute("data-i18n-title");
    if (translations[lang][key]) {
      el.setAttribute("title", translations[lang][key]);
    }
  });
}

export function applyDirection(lang) {
  const dir = lang === "ar" ? "rtl" : "ltr";

  document.documentElement.setAttribute("dir", dir);
  document.documentElement.setAttribute("lang", lang);
  document.body.setAttribute("dir", dir);
}

// تبديل اللغة
export function toggleLanguage() {
  const current = getCurrentLang();
  const newLang = current === "ar" ? "en" : "ar";

  setLang(newLang);
  applyTranslations(newLang);
  applyDirection(newLang);

  // Notify JS-generated widgets (e.g. modal dropdowns) to re-render
  document.dispatchEvent(
    new CustomEvent("langchange", { detail: { lang: newLang } }),
  );
}


export function t(key: string) {
  const lang = getCurrentLang();
  return (translations[lang] && translations[lang][key]) || key;
}

/** Runs once per page load: applies saved language + wires the toggle button. */
export function initTranslate() {
  const lang = getCurrentLang();
  applyTranslations(lang);
  applyDirection(lang);
  document.querySelectorAll(".language-btn").forEach((btn) => {
    if (!(btn as any).__wired) {
      (btn as any).__wired = true;
      btn.addEventListener("click", toggleLanguage);
    }
  });
}
