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

    // Footer
    footer_about:
      "منصة صوت، تأسست لتكون مساحة للمبدعين، تجمع الحاضنة، صوت ميديا، والصوت نفسه، لتقديم محتوى ملهم وتجارب فريدة لكل من يسعى لصوته أن يُسمع.",
    footer_main_sections: "الأقسام الرئيسية",
    footer_quick_links: "روابط سريعة",
    footer_backstage: "الكواليس",
    footer_media_kit: "MEDIA KIT",
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

    // Content page
    tab_money_business: "المال والأعمال",
    tab_economy: "الاقتصاد",
    tab_economy_philosophy: "الاقتصاد والفلسفة",
    sort_label: "الترتيب:",
    sort_most_viewed: "الأكثر مشاهدة",
    sort_option_one: "واحد",
    sort_option_two: "اثنان",
    sort_option_three: "ثلاثة",
    most_watched_pre: "الأكثر",
    most_watched_highlight: "مشاهدة",

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

    // Footer
    footer_about:
      "Sawt platform was founded to be a space for creators — bringing together the Incubator, Sawt Media, and the voice itself — to deliver inspiring content and unique experiences for everyone who wants their voice to be heard.",
    footer_main_sections: "Main Sections",
    footer_quick_links: "Quick Links",
    footer_backstage: "Backstage",
    footer_media_kit: "MEDIA KIT",
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

    // Content page
    tab_money_business: "Money & Business",
    tab_economy: "Economy",
    tab_economy_philosophy: "Economy & Philosophy",
    sort_label: " Sort by: ",
    sort_most_viewed: " Most Viewed",
    sort_option_one: "One",
    sort_option_two: "Two",
    sort_option_three: "Three",
    most_watched_pre: "Most",
    most_watched_highlight: "Watched",

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
