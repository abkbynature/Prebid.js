(function() {

// Generic settings.
var rpn = Math.floor((Math.random() * 100) + 1),
    deviceType = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
    trace = true,
    version = '0.53',
    pub = '6810',
    placement = '60681',
    ra,
    raEndPoint = '//te.renetl.com/hb/img?',
    raSampleRate = 1,
    gaSampleRate = 1;

// Prebid settings.
var PREBID_TIMEOUT = 5000,
    PREBID_MAX_ADUNITS = 7,
    PREBID_MAX_SIZES = 7,
    PREBID_AUCTIONENDED = false,
    PREBID_AUCTIONSTARTED = false,
    ADUNITS = [],
    PREBID_ADUNITS = {
        '*': {
            bids: [
                {
                    bidder: 'rhythmone',
                    params: { placementId: '49167' }
                },
                {
                    bidder: 'appnexus',
                    params: { placementId: '10040811' }
                },
                // {
                //     bidder: 'openx',
                //     params: { unit: '538622959', jstag_url: 'http://allmedia-d.openx.net/w/1.0/jstag?nc=22732481-SideReel' }
                // },
                {
                    bidder: 'openx',
                    params: { unit: '538622959', delDomain: 'allmedia-d.openx.net' }
                },
                {
                    bidder: 'aol',
                    params: { placement: '4400979', network: '9454.1' }
                },
                {
                    bidder: 'defymedia',
                    params: { placementId: '10685100' }
                }
            ]
        }
    },
    AOL_MAP = {
        mobile: {
            '320x50': '4400981',
            '300x250': '4400981'
        },
        desktop: {
            '970x250': '4400980',
            '728x90': '4400980',
            '300x600': '4400979',
            '300x250': '4400979',
            '160x600': '4311765'
        }
    },
    DEFYMEDIA_MAP = {
        mobile: {
            '320x50': '10685036',
            '300x250': '10685036'
        },
        desktop: {
            '970x250': '10685023',
            '728x90': '10685100',
            '300x600': '10685047',
            '300x250': '10685047',
            '160x600': '10685047'
        }
    },
    OPENX_MAP = {
        "/22732481/sidereel_responsive_home_main-top": {
            "320x50": 538174788,
            "728x90": 538174788
        },
        "/22732481/sidereel_pubmatic_728x90_btf": {
            "728x90": 538167857
        },
        "/22732481/sidereel_leaderboard_300x250_atf": {
            "300x600": 538174720,
            "300x250": 538174720
        },
        "/22732481/sidereel_responsive_season_main-bottom": {
            "728x90": 538174416,
            "300x250": 538174416,
            "320x50": 538174416
        },
        "/22732481/spin_sidereel_embed_728x90_atf": {
            "728x90": 538174508,
            "970x250": 538174508
        },
        "/22732481/sidereel_responsive_genre_main-top": {
            "320x50": 538174797,
            "728x90": 538174797
        },
        "/22732481/sidereel_responsive_topic_main-top": {
            "320x50": 538174642,
            "728x90": 538174642
        },
        "/22732481/spin_sidereel_news_728x90_btf": {
            "728x90": 538174417
        },
        "/22732481/sidereel_responsive_episode_guide_sidebar-top": {
            "300x600": 538167871,
            "300x250": 538167871
        },
        "/22732481/spin_sidereel_movieindex_728x90_btf": {
            "728x90": 538174717
        },
        "/22732481/sidereel_responsive_lsrp_main-bottom": {
            "728x90": 538174438,
            "300x250": 538174438,
            "320x50": 538174438
        },
        "/22732481/sidereel_responsive_tracker_main-top": {
            "320x50": 538174665,
            "728x90": 538174665
        },
        "/22732481/sidereel_responsive_show_airtimes_sidebar-bottom": {
            "300x250": 538174512,
            "160x600": 538174512
        },
        "/22732481/spin_sidereel_most_tracked_shows_728x90_atf": {
            "728x90": 538174767,
            "970x250": 538174767
        },
        "/22732481/sidereel_home_728x90_atf": {
            "728x90": 538174440
        },
        "/22732481/sidereel_responsive_calendar_sidebar-top-desktop-only": {
            "300x600": 538174437,
            "300x250": 538174437
        },
        "/22732481/sidereel_pubmatic_pmp_728x90_ATF": {
            "728x90": 538174707
        },
        "/22732481/spin_sidereel_movieindex_300x250_atf": {
            "300x600": 538167874,
            "300x250": 538167874
        },
        "/22732481/sidereel_xaxis_passback_160x600_BTF": {
            "160x600": 538174584
        },
        "/22732481/spin_sidereel_news_160x600_btf": {
            "160x600": 538174748
        },
        "/22732481/sidereel_responsive_home_main-middle": {
            "728x90": 538167897,
            "300x250": 538167897,
            "320x50": 538167897
        },
        "/22732481/sidereel_responsive_lsrp_main-top": {
            "320x50": 538174777,
            "728x90": 538174777
        },
        "/22732481/spin_sidereel_episode_728x90_btf": {
            "728x90": 538174800
        },
        "/22732481/sidereel_responsive_new_tonight_main-middle": {
            "320x50": 538174419,
            "300x250": 538174419
        },
        "/22732481/spin_sidereel_character_728x90_btf": {
            "728x90": 538174522
        },
        "/22732481/spin_sidereel_home_300x250_atf": {
            "300x600": 538174627,
            "300x250": 538174627
        },
        "/22732481/sidereel_responsive_episode_main-top": {
            "320x50": 538174618,
            "728x90": 538174618
        },
        "/22732481/sidereel_webtv_season_300x250_atf": {
            "300x600": 538174606,
            "300x250": 538174606
        },
        "/22732481/sidereel_tracker_300x250_btf_2": {
            "300x600": 538174761,
            "300x250": 538174761
        },
        "/22732481/spin_sidereel_public_profile_300x250_atf": {
            "300x600": 538174428,
            "300x250": 538174428
        },
        "/22732481/spin_sidereel_most_tracked_shows_300x250_btf": {
            "300x250": 538174562
        },
        "/22732481/spin_sidereel_episode_300x250_atf": {
            "300x600": 538174787,
            "300x250": 538174787
        },
        "/22732481/spin_sidereel_season_300x250_novideo_atf": {
            "300x250": 538174687
        },
        "/22732481/sidereel_ros_billboard_1x1": {
            "970x250": 538167883
        },
        "/22732481/sidereel_ros_300x250_btf": {
            "300x600": 538174660,
            "300x250": 538174660
        },
        "/22732481/spin_sidereel_tracker_320x50_btf_mobile": {
            "320x50": 538174575
        },
        "/22732481/sidereel_burst_tier2_passback_300x250_atf": {
            "300x250": 538174766
        },
        "/22732481/sidereel_pubmatic_160x600_atf": {
            "160x600": 538174577
        },
        "/22732481/sidereel_responsive_tv_main-middle": {
            "728x90": 538174503,
            "300x250": 538174503,
            "320x50": 538174503
        },
        "/22732481/spin_sidereel_review_page_728x90_atf": {
            "728x90": 538174557,
            "970x250": 538174557
        },
        "/22732481/spin_sidereel_genre_320x50_atf_mobile": {
            "320x50": 538174701
        },
        "/22732481/smaato_sidereel_ios_banner": {
            "300x600": 538174770,
            "160x600": 538174770,
            "728x90": 538174770,
            "300x250": 538174770,
            "970x250": 538174770,
            "320x50": 538174770
        },
        "/22732481/spin_sidereel_episode_160x600_atf": {
            "160x600": 538174501
        },
        "/22732481/sidereel_responsive_episode_guide_main-top": {
            "320x50": 538174427,
            "728x90": 538174427
        },
        "/22732481/sidereel_burst_tier2_passback_300x250_btf": {
            "300x250": 538167896
        },
        "/22732481/spin_sidereel_badges_profile_300x250_atf": {
            "300x250": 538174422
        },
        "/22732481/spin_sidereel_post_728x90_atf": {
            "728x90": 538174803,
            "970x250": 538174803
        },
        "/22732481/sidereel_responsive_tracker_main-middle-desktop-only": {
            "728x90": 538174740
        },
        "/22732481/sidereel_responsive_most_tracked_sidebar-bottom": {
            "300x250": 538167899,
            "160x600": 538167899
        },
        "/22732481/spin_sidereel_moviegenre_300x250_atf": {
            "300x600": 538174455,
            "300x250": 538174455
        },
        "/22732481/sidereel_responsive_show_review_main-top": {
            "320x50": 538174677,
            "728x90": 538174677
        },
        "/22732481/sidereel_responsive_404_main-top": {
            "320x50": 538174813,
            "728x90": 538174813
        },
        "bm": 1,
        "/22732481/spin_sidereel_badges_profile_728x90_btf": {
            "728x90": 538174561
        },
        "/22732481/sidereel_responsive_episode_main-bottom": {
            "728x90": 538174752,
            "300x250": 538174752,
            "320x50": 538174752
        },
        "/22732481/sidereel_tvlistings_728x90_btf": {
            "728x90": 538174558
        },
        "/22732481/sidereel_technorati_passback_300x250_btf": {
            "300x250": 538174709
        },
        "/22732481/sidereel_most_tracked_shows_300x250_atf": {
            "300x600": 538174759,
            "300x250": 538174759
        },
        "/22732481/spin_sidereel_highest_rated_shows_728x90_btf": {
            "728x90": 538174798
        },
        "/22732481/spin_sidereel_tvlistings_728x90_int8": {
            "728x90": 538174697
        },
        "/22732481/spin_sidereel_tvlistings_728x90_int9": {
            "728x90": 538174696
        },
        "/22732481/sidereel_responsive_episode_guide_sidebar-bottom-desktop-only": {
            "300x250": 538174415,
            "160x600": 538174415
        },
        "/22732481/sidereel_responsive_webtv_show_main-top": {
            "320x50": 538174614,
            "728x90": 538174614
        },
        "/22732481/spin_sidereel_tvlistings_728x90_int1": {
            "728x90": 538174693
        },
        "/22732481/spin_sidereel_tvlistings_728x90_int2": {
            "728x90": 538174530
        },
        "/22732481/spin_sidereel_tvshow_728x90_atf": {
            "728x90": 538174656,
            "970x250": 538174656
        },
        "/22732481/sidereel_responsive_show_airtimes_sidebar-bottom-desktop-only": {
            "300x250": 538174592,
            "160x600": 538174592
        },
        "/22732481/spin_sidereel_tvlistings_728x90_int5": {
            "728x90": 538174690
        },
        "/22732481/spin_sidereel_tvlistings_728x90_int6": {
            "728x90": 538174689
        },
        "/22732481/spin_sidereel_tvlistings_728x90_int7": {
            "728x90": 538174688
        },
        "/22732481/spin_sidereel_leaderboard_300x250_atf": {
            "300x600": 538167890,
            "300x250": 538167890
        },
        "/22732481/spin_sidereel_television_728x90_atf": {
            "728x90": 538174556,
            "970x250": 538174556
        },
        "/22732481/sidereel_ros_160x600_btf": {
            "160x600": 538174423
        },
        "/22732481/sidereel_most_tracked_300x250_atf": {
            "300x600": 538174778,
            "300x250": 538174778
        },
        "/22732481/sidereel_responsive_tv_sidebar-middle": {
            "300x250": 538174699
        },
        "/22732481/spin_sidereel_tracker_728x90_atf": {
            "728x90": 538174505,
            "970x250": 538174505
        },
        "/22732481/sidereel_season_300x250_novideo_atf": {
            "300x600": 538174702,
            "300x250": 538174702
        },
        "/22732481/sidereel_responsive_lip_sidebar-top-desktop-only": {
            "300x600": 538174721,
            "300x250": 538174721
        },
        "/22732481/spin_sidereel_tvshow_728x90_mtf": {
            "728x90": 538174610
        },
        "/22732481/sidereel_responsive_notifications_main-top": {
            "320x50": 538174544,
            "728x90": 538174544
        },
        "/22732481/spin_sidereel_news_728x90_atf": {
            "728x90": 538174783,
            "970x250": 538174783
        },
        "/22732481/sidereel_gamut_passback_160x600_btf": {
            "160x600": 538174695
        },
        "/22732481/spin_sidereel_episode_728x90_atf": {
            "728x90": 538174467,
            "970x250": 538174467
        },
        "/22732481/sidereel_responsive_highest_rated_sidebar-bottom": {
            "300x250": 538174762,
            "160x600": 538174762
        },
        "/22732481/spin_sidereel_badges_individual_profile_300x250_atf": {
            "300x600": 538174507,
            "300x250": 538174507
        },
        "/22732481/sidereel_burst_tier2_passback_728x90_btf": {
            "728x90": 538174643
        },
        "/22732481/sidereel_pubmatic_300x250_atf": {
            "300x250": 538174626
        },
        "/22732481/sidereel_highest_rated_shows_300x250_atf": {
            "300x600": 538174439,
            "300x250": 538174439
        },
        "/22732481/spin_sidereel_most_tracked_shows_300x250_atf": {
            "300x600": 538174686,
            "300x250": 538174686
        },
        "/22732481/sidereel_responsive_season_main-top": {
            "320x50": 538174563,
            "728x90": 538174563
        },
        "/22732481/spin_sidereel_character_728x90_atf": {
            "728x90": 538174461,
            "970x250": 538174461
        },
        "/22732481/sidereel_responsive_show_event_sidebar-bottom": {
            "300x250": 538174495,
            "160x600": 538174495
        },
        "/22732481/sidereel_technorati_passback_728x90_btf": {
            "728x90": 538174603
        },
        "/22732481/spin_sidereel_tracker_300x250_btf": {
            "300x250": 538174744
        },
        "/22732481/spin_sidereel_person_728x90_atf": {
            "728x90": 538174764,
            "970x250": 538174764
        },
        "/22732481/sidereel_responsive_topic_sidebar-top-desktop-only": {
            "300x600": 538174443,
            "300x250": 538174443
        },
        "/22732481/spin_sidereel_lsrp_300x250_atf": {
            "300x600": 538167898,
            "300x250": 538167898
        },
        "/22732481/sidereel_responsive_tv_main-bottom": {
            "728x90": 538174406,
            "300x250": 538174406,
            "320x50": 538174406
        },
        "/22732481/spin_sidereel_webtv_tvshow_728x90_btf": {
            "728x90": 538174489
        },
        "/22732481/sidereel_gamut_passback_300x250_atf": {
            "300x250": 538174409
        },
        "/22732481/spin_sidereel_highest_rated_shows_300x250_atf": {
            "300x600": 538174700,
            "300x250": 538174700
        },
        "/22732481/sidereel_smaato_mobile_300x250": {
            "300x250": 538174411
        },
        "/22732481/spin_sidereel_user_review_300x250_atf": {
            "300x600": 538167889,
            "300x250": 538167889
        },
        "/22732481/spin_sidereel_highest_rated_shows_728x90_atf": {
            "728x90": 538174736,
            "970x250": 538174736
        },
        "/22732481/sidereel_responsive_show_review_sidebar-top": {
            "300x600": 538174714,
            "300x250": 538174714
        },
        "/22732481/spin_sidereel_public_profile_728x90_2_btf": {
            "728x90": 538174671
        },
        "/22732481/sidereel_responsive_post_index_sidebar-bottom-wide": {
            "160x600": 538174565
        },
        "/22732481/sidereel_responsive_genre_index_sidebar-top-desktop-only": {
            "300x600": 538174446,
            "300x250": 538174446
        },
        "/22732481/sidereel_responsive_calendar_main-top": {
            "320x50": 538174424,
            "728x90": 538174424
        },
        "/22732481/spin_sidereel_premiere_finale_cal_728x90_atf": {
            "728x90": 538174708,
            "970x250": 538174708
        },
        "/22732481/spin_sidereel_calendar_300x250_atf": {
            "300x600": 538174444,
            "300x250": 538174444
        },
        "/22732481/spin_sidereel_premiere_finale_cal_300x250_atf": {
            "300x600": 538174790,
            "300x250": 538174790
        },
        "/22732481/spin_sidereel_tracker_320x50_atf_mobile": {
            "320x50": 538174448
        },
        "/22732481/sidereel_responsive_listings_main-bottom": {
            "728x90": 538174675,
            "300x250": 538174675,
            "320x50": 538174675
        },
        "/22732481/sidereel_burst_tier2_passback_160x600_btf": {
            "160x600": 538174607
        },
        "/22732481/sidereel_sovrn_300x250_atf": {
            "300x250": 538174620
        },
        "/22732481/spin_sidereel_webtv_season_728x90_atf": {
            "728x90": 538174812,
            "970x250": 538174812
        },
        "/22732481/sidereel_responsive_topic_main-bottom": {
            "728x90": 538174654,
            "300x250": 538174654,
            "320x50": 538174654
        },
        "/22732481/sidereel_responsive_friends_main-bottom": {
            "728x90": 538174420,
            "300x250": 538174420,
            "320x50": 538174420
        },
        "/22732481/sidereel_friends_728x90_btf": {
            "728x90": 538174491
        },
        "/22732481/spin_sidereel_movie_728x90_atf": {
            "728x90": 538174737,
            "970x250": 538174737
        },
        "/22732481/sidereel_tvlistings_728x90_int10": {
            "728x90": 538174704
        },
        "/22732481/spin_sidereel_badges_profile_160x600_btf": {
            "160x600": 538174521
        },
        "/22732481/spin_sidereel_post_728x90_btf": {
            "728x90": 538174518
        },
        "/22732481/sidereel_friends_300x250_atf": {
            "300x250": 538167887
        },
        "/22732481/spin_sidereel_television_728x90_btf": {
            "728x90": 538174616
        },
        "/22732481/spin_sidereel_public_profile_160x600_btf": {
            "160x600": 538174724
        },
        "/22732481/sidereel_responsive_show_review_main-bottom": {
            "728x90": 538174590,
            "300x250": 538174590,
            "320x50": 538174590
        },
        "/22732481/spin_sidereel_review_page_728x90_btf": {
            "728x90": 538174646
        },
        "/22732481/sidereel_responsive_activity_feed_main-top": {
            "320x50": 538174595,
            "728x90": 538174595
        },
        "/22732481/sidereel_responsive_web_episode_main-top": {
            "320x50": 538174504,
            "728x90": 538174504
        },
        "/22732481/spin_sidereel_tvgenre_728x90_atf": {
            "728x90": 538174808,
            "970x250": 538174808
        },
        "/22732481/sidereel_responsive_cancellation_buzz_sidebar-top": {
            "300x600": 538174532,
            "300x250": 538174532
        },
        "/22732481/spin_sidereel_episode_guide_728x90_atf": {
            "728x90": 538174619,
            "970x250": 538174619
        },
        "/22732481/spin_sidereel_tracker_728x90_btf": {
            "728x90": 538174647
        },
        "/22732481/spin_sidereel_ros_728x90_btf": {
            "728x90": 538174649
        },
        "/22732481/sidereel_responsive_profile_sidebar-bottom": {
            "300x250": 538174567,
            "160x600": 538174567
        },
        "/22732481/spin_sidereel_season_320x50_btf_mobile": {
            "320x50": 538174549
        },
        "/22732481/spin_sidereel_showlist_728x90_atf": {
            "728x90": 538174718,
            "970x250": 538174718
        },
        "/22732481/spin_sidereel_premiere_finale_cal_728x90_btf": {
            "728x90": 538174694
        },
        "/22732481/spin_sidereel_season_300x250_btf_mobile": {
            "300x250": 538167888
        },
        "/22732481/spin_sidereel_recommendations_728x90_btf": {
            "728x90": 538174604
        },
        "/22732481/sidereel_spin_mobile_web_home_300x250": {
            "300x250": 538174432
        },
        "/22732481/spin_sidereel_television_300x250_btf": {
            "300x600": 538174516,
            "300x250": 538174516
        },
        "/22732481/sidereel_webtv_episode_300x250_atf": {
            "300x600": 538174581,
            "300x250": 538174581
        },
        "/22732481/spin_sidereel_season_320x50_atf_mobile": {
            "320x50": 538174774
        },
        "/22732481/spin_sidereel_episode_300x250_btf": {
            "300x250": 538174727
        },
        "/22732481/sidereel_technorati_passback_728x90_atf": {
            "728x90": 538174569
        },
        "/22732481/sidereel_responsive_webtv_show_main-middle": {
            "728x90": 538174452,
            "300x250": 538174452,
            "320x50": 538174452
        },
        "/22732481/sidereel_home_300x250_atf": {
            "300x600": 538174669,
            "300x250": 538174669
        },
        "/22732481/spin_sidereel_ros_160x600_btf": {
            "160x600": 538167860
        },
        "/22732481/sidereel_responsive_tv_sidebar-bottom": {
            "300x250": 538174793,
            "160x600": 538174793
        },
        "/22732481/sidereel_responsive_highest_rated_main-top": {
            "320x50": 538174464,
            "728x90": 538174464
        },
        "/22732481/sidereel_responsive_premiere_finale_cal_main-top": {
            "320x50": 538174525,
            "728x90": 538174525
        },
        "/22732481/sidereel_responsive_show_main-middle": {
            "728x90": 538174779,
            "300x250": 538174779,
            "320x50": 538174779
        },
        "/22732481/sidereel_responsive_show_airtimes_sidebar-top": {
            "300x600": 538167858,
            "300x250": 538167858
        },
        "/22732481/sidereel_tvlistings_728x90_atf": {
            "728x90": 538174658
        },
        "/22732481/sidereel_responsive_recommendations_sidebar-top": {
            "300x600": 538174414,
            "300x250": 538174414
        },
        "/22732481/spin_sidereel_webtvindex_728x90_atf": {
            "728x90": 538174706,
            "970x250": 538174706
        },
        "/22732481/sidereel_responsive_tv_sidebar-top": {
            "300x600": 538174791,
            "300x250": 538174791
        },
        "/22732481/spin_sidereel_calendar_728x90_btf": {
            "728x90": 538167870,
            "970x250": 538167870
        },
        "/22732481/sidereel_responsive_episode_sidebar-bottom-wide": {
            "160x600": 538174698
        },
        "/22732481/spin_sidereel_most_tracked_shows_728x90_btf": {
            "728x90": 538174613
        },
        "/22732481/sidereel_responsive_webtv_show_sidebar-middle": {
            "300x250": 538174543
        },
        "/22732481/sidereel_burst_tier1_passback_300x250_btf": {
            "300x250": 538174471
        },
        "/22732481/sidereel_responsive_ssrp_main-top": {
            "320x50": 538174722,
            "728x90": 538174722
        },
        "/22732481/spin_sidereel_showlist_160x600_btf": {
            "160x600": 538174814
        },
        "/22732481/sidereel_responsive_404_main-bottom": {
            "728x90": 538174726,
            "300x250": 538174726,
            "320x50": 538174726
        },
        "/22732481/sidereel_responsive_show_list_sidebar-top": {
            "300x600": 538174449,
            "300x250": 538174449
        },
        "/22732481/sidereel_responsive_season_sidebar-bottom-desktop-only": {
            "300x250": 538174407,
            "160x600": 538174407
        },
        "/22732481/spin_sidereel_lsrp_728x90_atf": {
            "728x90": 538174710,
            "970x250": 538174710
        },
        "/22732481/sidereel_spin_mobile_web_ros_320x50_a": {
            "320x50": 538174775
        },
        "/22732481/sidereel_responsive_post_index_main-bottom": {
            "728x90": 538174725,
            "300x250": 538174725,
            "320x50": 538174725
        },
        "/22732481/spin_sidereel_welcome_300x250_atf": {
            "300x250": 538174801
        },
        "timeout": 2500,
        "/22732481/sidereel_tracker_300x250_btf_mobile": {
            "300x250": 538174680
        },
        "/22732481/spin_sidereel_moviegenre_728x90_atf": {
            "728x90": 538174517,
            "970x250": 538174517
        },
        "/22732481/sidereel_responsive_calendar_main-bottom": {
            "728x90": 538174412,
            "300x250": 538174412,
            "320x50": 538174412
        },
        "/22732481/sidereel_responsive_web_episode_sidebar-bottom-desktop-only": {
            "300x250": 538174460,
            "160x600": 538174460
        },
        "/22732481/spin_sidereel_premiere_finale_cal_160x600_btf": {
            "160x600": 538174716
        },
        "/22732481/sidereel_responsive_profile_main-top": {
            "320x50": 538174523,
            "728x90": 538174523
        },
        "/22732481/sidereel_responsive_most_tracked_sidebar-top": {
            "300x600": 538174519,
            "300x250": 538174519
        },
        "/22732481/sidereel_responsive_post_index_main-top": {
            "320x50": 538174810,
            "728x90": 538174810
        },
        "/22732481/sidereel_responsive_post_main-top": {
            "320x50": 538174588,
            "728x90": 538174588
        },
        "/22732481/sidereel_responsive_tv_main-top": {
            "320x50": 538174758,
            "728x90": 538174758
        },
        "/22732481/sidereel_responsive_genre_index_sidebar-bottom-desktop-only": {
            "300x250": 538174816,
            "160x600": 538174816
        },
        "/22732481/spin_sidereel_season_728x90_atf": {
            "728x90": 538174513
        },
        "/22732481/sidereel_season_300x250_atf": {
            "300x600": 538174510,
            "300x250": 538174510
        },
        "/22732481/sidereel_tvlistings_728x90_int8": {
            "728x90": 538174637
        },
        "/22732481/sidereel_tvlistings_728x90_int9": {
            "728x90": 538174625
        },
        "/22732481/sidereel_responsive_lip_main-bottom": {
            "728x90": 538174672,
            "300x250": 538174672,
            "320x50": 538174672
        },
        "/22732481/sidereel_tvlistings_728x90_int4": {
            "728x90": 538174634
        },
        "/22732481/sidereel_tvlistings_728x90_int5": {
            "728x90": 538174633
        },
        "/22732481/sidereel_tvlistings_728x90_int6": {
            "728x90": 538174661
        },
        "/22732481/sidereel_tvlistings_728x90_int7": {
            "728x90": 538174659
        },
        "/22732481/spin_sidereel_movieindex_728x90_atf": {
            "728x90": 538174756,
            "970x250": 538174756
        },
        "/22732481/sidereel_tvlistings_728x90_int1": {
            "728x90": 538174630
        },
        "/22732481/sidereel_tvlistings_728x90_int2": {
            "728x90": 538174632
        },
        "/22732481/sidereel_tvlistings_728x90_int3": {
            "728x90": 538174631
        },
        "/22732481/spin_sidereel_show_list_300x250_atf": {
            "300x600": 538174799,
            "300x250": 538174799
        },
        "/22732481/spin_sidereel_static_728x90_atf": {
            "728x90": 538167901,
            "970x250": 538167901
        },
        "/22732481/sidereel_responsive_cancellation_buzz_main-top": {
            "320x50": 538174546,
            "728x90": 538174546
        },
        "/22732481/sidereel_burst_tier1_passback_728x90_btf": {
            "728x90": 538174741
        },
        "ms": true,
        "/22732481/spin_sidereel_embed_728x90_2_btf": {
            "728x90": 538174624
        },
        "/22732481/sidereel_tracker_300x250_btf": {
            "300x250": 538174456
        },
        "/22732481/sidereel_responsive_genre_index_main-bottom": {
            "728x90": 538167863,
            "300x250": 538167863,
            "320x50": 538167863
        },
        "/22732481/sidereel_responsive_cancellation_buzz_main-bottom": {
            "728x90": 538174531,
            "300x250": 538174531,
            "320x50": 538174531
        },
        "/22732481/sidereel_ros_300x250_atf": {
            "300x600": 538174615,
            "300x250": 538174615
        },
        "/22732481/spin_sidereel_television_300x250_atf": {
            "300x600": 538174755,
            "300x250": 538174755
        },
        "/22732481/spin_sidereel_daily_728x90_btf": {
            "728x90": 538174734
        },
        "/22732481/spin_sidereel_tracker_300x250_btf_2": {
            "300x250": 538174683
        },
        "/22732481/spin_sidereel_recommendations_728x90_atf": {
            "728x90": 538174468,
            "970x250": 538174468
        },
        "/22732481/sidereel_friends_728x90_atf": {
            "728x90": 538174784
        },
        "/22732481/sidereel_burst_tier1_passback_160x600_btf": {
            "160x600": 538174469
        },
        "/22732481/sidereel_pubmatic_728x90_atf": {
            "728x90": 538174453
        },
        "/22732481/sidereel_welcome_320x50_atf_mobile": {
            "320x50": 538174511
        },
        "/22732481/spin_sidereel_webtv_tvshow_728x90_atf": {
            "728x90": 538167869,
            "970x250": 538167869
        },
        "/22732481/sidereel_responsive_home_sidebar-top": {
            "300x600": 538174490,
            "300x250": 538174490
        },
        "/22732481/sidereel_responsive_leaderboard_sidebar-top": {
            "300x600": 538174500,
            "300x250": 538174500
        },
        "/22732481/sidereel_ios_ipad_300x250_2": {
            "300x250": 538174434
        },
        "/22732481/sidereel_ios_ipad_300x250_3": {
            "300x250": 538174433
        },
        "/22732481/sidereel_ios_ipad_300x250_1": {
            "300x250": 538174435
        },
        "/22732481/sidereel_home_300x250_btf": {
            "300x600": 538174533,
            "300x250": 538174533
        },
        "/22732481/spin_sidereel_show_airings_300x250_atf": {
            "300x600": 538174786,
            "300x250": 538174786
        },
        "/22732481/sidereel_sovrn_728x90_btf": {
            "728x90": 538174753
        },
        "/22732481/sidereel_responsive_premiere_finale_cal_main-bottom": {
            "728x90": 538174754,
            "300x250": 538174754,
            "320x50": 538174754
        },
        "/22732481/spin_sidereel_ssrp_300x250_atf": {
            "300x600": 538174536,
            "300x250": 538174536
        },
        "/22732481/sidereel_400x300_atf": {
            "300x250": 538174487
        },
        "/22732481/sidereel_pubmatic_pmp_160x600_BTF": {
            "160x600": 538174653
        },
        "/22732481/sidereel_responsive_recommendations_main-top": {
            "320x50": 538174640,
            "728x90": 538174640
        },
        "/22732481/sidereel_responsive_listings_main-top": {
            "320x50": 538174515,
            "728x90": 538174515
        },
        "/22732481/sidereel_tracker_320x50_btf_mobile": {
            "320x50": 538174796
        },
        "/22732481/sidereel_xaxis_passback_300x250_ATF": {
            "300x250": 538174477
        },
        "/22732481/sidereel_responsive_show_sidebar-middle": {
            "300x250": 538174509
        },
        "/22732481/spin_sidereel_post_hub_400x300_atf": {
            "300x600": 538167872,
            "300x250": 538167872
        },
        "/22732481/spin_sidereel_calendar_160x600_atf": {
            "160x600": 538174593
        },
        "/22732481/sidereel_responsive_video_sidebar-top-desktop-only": {
            "300x600": 538174776,
            "300x250": 538174776
        },
        "/22732481/sidereel_responsive_episode_guide_sidebar-bottom": {
            "300x250": 538174473,
            "160x600": 538174473
        },
        "/22732481/sidereel_responsive_show_list_main-bottom": {
            "728x90": 538174484,
            "300x250": 538174484,
            "320x50": 538174484
        },
        "/22732481/spin_sidereel_home_320x50_atf_mobile": {
            "320x50": 538167864
        },
        "/22732481/spin_sidereel_ssrp_300x250_btf_mobile": {
            "300x250": 538174429
        },
        "/22732481/sidereel_responsive_topic_sidebar-bottom": {
            "300x250": 538167880,
            "160x600": 538167880
        },
        "/22732481/sidereel_pubmatic_160x600_btf": {
            "160x600": 538167893
        },
        "/22732481/sidereel_responsive_home_sidebar-bottom-short": {
            "300x250": 538174578
        },
        "/22732481/sidereel_pulsepoint_300x250_passback_atf": {
            "300x250": 538174579
        },
        "/22732481/spin_sidereel_leaderboard_728x90_atf": {
            "728x90": 538174451,
            "970x250": 538174451
        },
        "/22732481/spin_sidereel_tvshow_300x250_atf": {
            "300x600": 538174711,
            "300x250": 538174711
        },
        "/22732481/spin_sidereel_moviegenre_728x90_btf": {
            "728x90": 538167882
        },
        "/22732481/sidereel_ios_ipad_300x250_3_test": {
            "300x250": 538174555
        },
        "/22732481/spin_sidereel_webtv_episode_728x90_atf": {
            "728x90": 538174681,
            "970x250": 538174681
        },
        "/22732481/sidereel_responsive_show_event_sidebar-top": {
            "300x600": 538174426,
            "300x250": 538174426
        },
        "/22732481/sidereel_responsive_profile_main-bottom": {
            "728x90": 538167866,
            "300x250": 538167866,
            "320x50": 538167866
        },
        "/22732481/spin_sidereel_episode_guide_160x600_btf": {
            "160x600": 538167886
        },
        "/22732481/sidereel_tvshow_300x250_novideo_atf": {
            "300x600": 538167884,
            "300x250": 538167884
        },
        "/22732481/spin_sidereel_tvshow_160x600_btf": {
            "160x600": 538174655
        },
        "/22732481/spin_sidereel_static_160x600_btf": {
            "160x600": 538167881
        },
        "/22732481/sidereel_responsive_show_sidebar-top": {
            "300x600": 538174805,
            "300x250": 538174805
        },
        "/22732481/spin_sidereel_webtvindex_728x90_btf": {
            "728x90": 538174746
        },
        "/22732481/sidereel_responsive_news_main-middle": {
            "728x90": 538174482,
            "300x250": 538174482,
            "320x50": 538174482
        },
        "/22732481/spin_sidereel_ros_728x90_atf": {
            "728x90": 538174760,
            "970x250": 538174760
        },
        "/22732481/spin_sidereel_welcome_320x50_atf_mobile": {
            "300x250": 538167981
        },
        "/22732481/sidereel_ios_iphone_300x250_1": {
            "300x600": 538174465,
            "160x600": 538174465,
            "728x90": 538174465,
            "300x250": 538174465,
            "970x250": 538174465,
            "320x50": 538174465
        },
        "/22732481/sidereel_responsive_show_airtimes_main-top": {
            "320x50": 538167856,
            "728x90": 538167856
        },
        "/22732481/sidereel_responsive_show_airtimes_sidebar-top-desktop-only": {
            "300x600": 538174466,
            "300x250": 538174466
        },
        "/22732481/sidereel_responsive_genre_main-middle": {
            "728x90": 538174789,
            "300x250": 538174789,
            "320x50": 538174789
        },
        "/22732481/sidereel_smaato_mobile_320x50": {
            "320x50": 538174703
        },
        "/22732481/sidereel_sovrn_728x90_atf": {
            "728x90": 538167877
        },
        "/22732481/sidereel_webtv_tvshow_300x250_atf": {
            "300x600": 538174664,
            "300x250": 538174664
        },
        "/22732481/sidereel_responsive_web_episode_main-bottom": {
            "728x90": 538174550,
            "300x250": 538174550,
            "320x50": 538174550
        },
        "/22732481/sidereel_tracker_728x90_btf": {
            "728x90": 538174463
        },
        "/22732481/spin_sidereel_wnt_728x90_btf": {
            "728x90": 538174802
        },
        "/22732481/sidereel_responsive_leaderboard_main-top": {
            "320x50": 538174526,
            "728x90": 538174526
        },
        "/22732481/sidereel_responsive_news_sidebar-top": {
            "300x600": 538174679,
            "300x250": 538174679
        },
        "/22732481/spin_sidereel_ratings_reviews_300x250_atf": {
            "300x600": 538174497,
            "300x250": 538174497
        },
        "/22732481/spin_sidereel_webtv_episode_160x600_btf": {
            "160x600": 538174574
        },
        "/22732481/sidereel_responsive_genre_index_main-top": {
            "320x50": 538174474,
            "728x90": 538174474
        },
        "/22732481/sidereel_responsive_new_tonight_main-top": {
            "320x50": 538174580,
            "728x90": 538174580
        },
        "/22732481/spin_sidereel_webtv_tvshow_728x90_mtf": {
            "728x90": 538174527
        },
        "/22732481/sidereel_wnt_728x90_mtf": {
            "728x90": 538174781
        },
        "/22732481/spin_sidereel_lsrp_728x90_btf": {
            "728x90": 538174757
        },
        "/22732481/spin_sidereel_webtv_tvshow_300x250_novideo_atf": {
            "300x250": 538174457
        },
        "/22732481/sidereel_responsive_recommendations_main-bottom": {
            "728x90": 538174742,
            "300x250": 538174742,
            "320x50": 538174742
        },
        "/22732481/sidereel_responsive_topic_sidebar-bottom-desktop-only": {
            "300x250": 538174668,
            "160x600": 538174668
        },
        "/22732481/sidereel_responsive_webtv_show_main-bottom": {
            "728x90": 538174591,
            "300x250": 538174591,
            "320x50": 538174591
        },
        "/22732481/spin_sidereel_ros_300x250_atf": {
            "300x600": 538174450,
            "300x250": 538174450
        },
        "/22732481/sidereel_responsive_friends_main-top": {
            "320x50": 538174749,
            "728x90": 538174749
        },
        "/22732481/spin_sidereel_ratings_reviews_160x600_btf": {
            "160x600": 538167900
        },
        "/22732481/sidereel_burst_tier2_passback_728x90_atf": {
            "728x90": 538174733
        },
        "/22732481/sidereel_responsive_genre_sidebar-bottom": {
            "300x250": 538174576,
            "160x600": 538174576
        },
        "/22732481/sidereel_burst_tier1_passback_300x250_atf": {
            "300x250": 538174751
        },
        "/22732481/sidereel_television_728x90_btf": {
            "728x90": 538174472
        },
        "/22732481/spin_sidereel_webtv_episode_300x250_atf": {
            "300x250": 538174485
        },
        "/22732481/spin_sidereel_tvgenre_300x250_atf": {
            "300x600": 538174792,
            "300x250": 538174792
        },
        "/22732481/spin_sidereel_ssrp_728x90_atf": {
            "728x90": 538174617,
            "970x250": 538174617
        },
        "/22732481/spin_sidereel_show_list_728x90_2_btf": {
            "728x90": 538167892
        },
        "/22732481/sidereel_responsive_profile_sidebar-top": {
            "300x600": 538174540,
            "300x250": 538174540
        },
        "/22732481/sidereel_post_400x300_atf": {
            "300x600": 538174488
        },
        "/22732481/spin_sidereel_post_160x600_btf": {
            "160x600": 538174768
        },
        "/22732481/spin_sidereel_person_300x250_atf": {
            "300x600": 538174570,
            "300x250": 538174570
        },
        "/22732481/sidereel_xaxis_passback_728x90_ATF": {
            "728x90": 538174547
        },
        "/22732481/sidereel_responsive_show_airtimes_main-bottom": {
            "728x90": 538174713,
            "300x250": 538174713,
            "320x50": 538174713
        },
        "/22732481/spin_sidereel_webtv_season_300x250_novideo_atf": {
            "300x600": 538174743,
            "300x250": 538174743
        },
        "/22732481/spin_sidereel_static_728x90_btf": {
            "728x90": 538174639
        },
        "/22732481/sidereel_responsive_listings_main-middle-desktop-only": {
            "728x90": 538174745
        },
        "/22732481/sidereel_responsive_most_tracked_main-top": {
            "320x50": 538167868,
            "728x90": 538167868
        },
        "/22732481/sidereel_responsive_ssrp_sidebar-bottom-desktop-only": {
            "300x250": 538167859,
            "160x600": 538167859
        },
        "/22732481/sidereel_responsive_recommendations_sidebar-bottom": {
            "300x250": 538174719,
            "160x600": 538174719
        },
        "/22732481/sidereel_responsive_notifications_main-bottom": {
            "728x90": 538174815,
            "300x250": 538174815,
            "320x50": 538174815
        },
        "/22732481/spin_sidereel_moviegenre_160x600_btf": {
            "160x600": 538174554
        },
        "/22732481/sidereel_ios_iphone_320x50_1": {
            "300x600": 538174684,
            "160x600": 538174684,
            "728x90": 538174684,
            "300x250": 538174684,
            "970x250": 538174684,
            "320x50": 538174684
        },
        "/22732481/sidereel_responsive_ssrp_main-bottom": {
            "728x90": 538167876,
            "300x250": 538167876,
            "320x50": 538167876
        },
        "/22732481/spin_sidereel_leaderboard_160x600_btf": {
            "160x600": 538174723
        },
        "/22732481/sidereel_responsive_post_sidebar-top": {
            "300x600": 538174534,
            "300x250": 538174534
        },
        "/22732481/spin_sidereel_webtv_season_300x250_atf": {
            "300x250": 538174747
        },
        "/22732481/spin_sidereel_webtv_tvshow_300x250_atf": {
            "300x600": 538174462,
            "300x250": 538174462
        },
        "/22732481/spin_sidereel_wnt_728x90_atf": {
            "728x90": 538174441
        },
        "/22732481/sidereel_tracker_728x90_atf": {
            "728x90": 538174539
        },
        "/22732481/sidereel_responsive_news_sidebar-bottom": {
            "300x250": 538174628,
            "160x600": 538174628
        },
        "/22732481/sidereel_spin_mobile_web_home_320x50_a": {
            "320x50": 538174648
        },
        "/22732481/sidereel_responsive_highest_rated_sidebar-top": {
            "300x600": 538174641,
            "300x250": 538174641
        },
        "/22732481/sidereel_responsive_show_event_main-top": {
            "320x50": 538174673,
            "728x90": 538174673
        },
        "/22732481/spin_sidereel_tvlistings_728x90_int3": {
            "728x90": 538174692
        },
        "/22732481/sidereel_responsive_notifications_sidebar-top": {
            "300x600": 538174599,
            "300x250": 538174599
        },
        "/22732481/spin_sidereel_wnt_728x90_mtf": {
            "728x90": 538174499
        },
        "/22732481/spin_sidereel_tvlistings_728x90_int4": {
            "728x90": 538174691
        },
        "/22732481/sidereel_ros_728x90_atf": {
            "728x90": 538174811
        },
        "/22732481/sidereel_responsive_show_sidebar-bottom": {
            "300x250": 538174712,
            "160x600": 538174712
        },
        "/22732481/sidereel_responsive_home_sidebar-middle": {
            "300x250": 538174404
        },
        "/22732481/sidereel_responsive_calendar_sidebar-bottom-desktop-only": {
            "300x250": 538174431,
            "160x600": 538174431
        },
        "/22732481/sidereel_welcome_300x250_atf": {
            "300x600": 538174459,
            "300x250": 538174459
        },
        "/22732481/spin_sidereel_webtv_episode_728x90_btf": {
            "728x90": 538174662
        },
        "/22732481/sidereel_responsive_web_episode_sidebar-top-desktop-only": {
            "300x600": 538174715,
            "300x250": 538174715
        },
        "/22732481/spin_sidereel_embed_300x250_atf": {
            "300x600": 538174410,
            "300x250": 538174410
        },
        "/22732481/spin_sidereel_ros_300x250_btf": {
            "300x250": 538174795
        },
        "/22732481/sidereel_television_300x250_btf": {
            "300x250": 538174729
        },
        "/22732481/smaato_sidereel_ios_mrec": {
            "300x600": 538174670,
            "160x600": 538174670,
            "728x90": 538174670,
            "300x250": 538174670,
            "970x250": 538174670,
            "320x50": 538174670
        },
        "/22732481/sidereel_episode_guide_300x250_atf": {
            "300x600": 538174483,
            "300x250": 538174483
        },
        "/22732481/sidereel_calendar_300x250_atf": {
            "300x600": 538174650,
            "300x250": 538174650
        },
        "/22732481/sidereel_responsive_season_sidebar-top-video-desktop-only": {
            "300x600": 538174678,
            "300x250": 538174678
        },
        "/22732481/sidereel_tracker_320x50_atf_mobile": {
            "320x50": 538167902
        },
        "/22732481/spin_sidereel_ssrp_728x90_btf": {
            "728x90": 538174566
        },
        "/22732481/sidereel_home_728x90_btf": {
            "728x90": 538174629
        },
        "/22732481/sidereel_responsive_show_sidebar-top-video": {
            "300x600": 538174447,
            "300x250": 538174447
        },
        "/22732481/spin_sidereel_news_300x250_btf": {
            "300x250": 538174480
        },
        "/22732481/spin_sidereel_season_160x600_btf": {
            "160x600": 538174479
        },
        "/22732481/sidereel_technorati_passback_160x600_btf": {
            "160x600": 538174445
        },
        "/22732481/sidereel_tvshow_300x250_atf": {
            "300x600": 538174804,
            "300x250": 538174804
        },
        "/22732481/sidereel_tracker_300x50_atf_mobile": {
            "320x50": 538174586
        },
        "/22732481/spin_sidereel_episode_160x600_btf": {
            "160x600": 538174572
        },
        "/22732481/spin_sidereel_home_728x90_atf": {
            "728x90": 538174560,
            "970x250": 538174560
        },
        "/22732481/sidereel_responsive_lip_main-top": {
            "320x50": 538174806,
            "728x90": 538174806
        },
        "/22732481/sidereel_television_300x250_atf": {
            "300x600": 538167873,
            "300x250": 538167873
        },
        "/22732481/spin_sidereel_public_profile_728x90_atf": {
            "728x90": 538174731,
            "970x250": 538174731
        },
        "/22732481/sidereel_responsive_home_main-bottom": {
            "728x90": 538174494,
            "300x250": 538174494,
            "320x50": 538174494
        },
        "/22732481/spin_sidereel_calendar_728x90_atf": {
            "728x90": 538174674,
            "970x250": 538174674
        },
        "/22732481/sidereel_pulsepoint_728x90_passback_atf": {
            "728x90": 538174730
        },
        "/22732481/sidereel_responsive_cancellation_buzz_sidebar-bottom": {
            "300x250": 538174663,
            "160x600": 538174663
        },
        "/22732481/spin_sidereel_show_airings_728x90_atf": {
            "728x90": 538167895,
            "970x250": 538167895
        },
        "/22732481/spin_sidereel_genre_300x250_btf_mobile": {
            "300x250": 538174598
        },
        "/22732481/spin_sidereel_welcome_300x250_btf_mobile": {
            "300x250": 538174535
        },
        "/22732481/sidereel_responsive_tracker_sidebar-middle-desktop-only": {
            "300x250": 538174705
        },
        "/22732481/sidereel_smaato_mobileweb_ros_300x250_btf": {
            "300x250": 538174571
        },
        "/22732481/sidereel_responsive_show_list_main-top": {
            "320x50": 538174594,
            "728x90": 538174594
        },
        "/22732481/sidereel_responsive_tracker_main-bottom": {
            "728x90": 538174780,
            "300x250": 538174780,
            "320x50": 538174780
        },
        "/22732481/sidereel_webtv_season_300x250_novideo_atf": {
            "300x600": 538174600,
            "300x250": 538174600
        },
        "/22732481/spin_sidereel_webtv_tvshow_160x600_btf": {
            "160x600": 538174564
        },
        "/22732481/sidereel_responsive_welcome_sidebar-top": {
            "300x600": 538174667,
            "300x250": 538174667
        },
        "/22732481/spin_sidereel_show_airings_160x600_xtf": {
            "160x600": 538174553
        },
        "/22732481/spin_sidereel_post_300x250_atf": {
            "300x600": 538174583,
            "300x250": 538174583
        },
        "/22732481/sidereel_pubmatic_300x250_btf": {
            "300x250": 538174750
        },
        "/22732481/spin_sidereel_static_300x250_atf": {
            "300x600": 538174772,
            "300x250": 538174772
        },
        "/22732481/spin_sidereel_recommendations_300x250_atf": {
            "300x600": 538174682,
            "300x250": 538174682
        },
        "/22732481/sidereel_responsive_premiere_finale_cal_sidebar-top-desktop-only": {
            "300x600": 538174739,
            "300x250": 538174739
        },
        "/22732481/sidereel_technorati_passback_300x250_atf": {
            "300x250": 538167867
        },
        "/22732481/spin_sidereel_webtv_tvshow_300x250_btf": {
            "300x250": 538174537
        },
        "/22732481/spin_sidereel_ssrp_320x50_atf_mobile": {
            "320x50": 538174458
        },
        "/22732481/sidereel_pubmatic_pmp_300x250_ATF": {
            "300x250": 538174454
        },
        "/22732481/spin_sidereel_404_728x90_atf": {
            "728x90": 538174545
        },
        "/22732481/sidereel_smaato_mobileweb_homepage_300x250_btf": {
            "300x250": 538174585
        },
        "/22732481/sidereel_responsive_video_main-bottom": {
            "728x90": 538174418,
            "300x250": 538174418,
            "320x50": 538174418
        },
        "/22732481/spin_sidereel_ratings_reviews_728x90_atf": {
            "728x90": 538174666,
            "970x250": 538174666
        },
        "/22732481/sidereel_responsive_genre_index_sidebar-top": {
            "300x600": 538174636,
            "300x250": 538174636
        },
        "/22732481/sidereel_responsive_topic_sidebar-top": {
            "300x600": 538174403,
            "300x250": 538174403
        },
        "/22732481/sidereel_responsive_episode_guide_sidebar-top-desktop-only": {
            "300x600": 538174520,
            "300x250": 538174520
        },
        "/22732481/spin_sidereel_movie_300x250_atf": {
            "300x600": 538174502,
            "300x250": 538174502
        },
        "/22732481/spin_sidereel_webtv_season_160x600_btf": {
            "160x600": 538174529
        },
        "/22732481/sidereel_show_list_300x250_atf": {
            "300x600": 538167879,
            "300x250": 538167879
        },
        "zlb": false,
        "/22732481/sidereel_responsive_most_tracked_main-bottom": {
            "728x90": 538174735,
            "300x250": 538174735,
            "320x50": 538174735
        },
        "/22732481/spin_sidereel_user_review_728x90_atf": {
            "728x90": 538174589,
            "970x250": 538174589
        },
        "/22732481/sidereel_spin_mobile_web_ros_320x50_c": {
            "320x50": 538174573
        },
        "/22732481/sidereel_post_300x250_atf": {
            "300x600": 538174506,
            "300x250": 538174506
        },
        "/22732481/spin_sidereel_tvshow_300x250_novideo_atf": {
            "300x250": 538174475
        },
        "/22732481/sidereel_responsive_news_main-top": {
            "320x50": 538174478,
            "728x90": 538174478
        },
        "/22732481/sidereel_spin_mobile_web_ros_320x50_b": {
            "320x50": 538174773
        },
        "/22732481/sidereel_responsive_new_tonight_main-bottom": {
            "728x90": 538174685,
            "300x250": 538174685,
            "320x50": 538174685
        },
        "/22732481/sidereel_responsive_genre_main-bottom": {
            "728x90": 538174782,
            "300x250": 538174782,
            "320x50": 538174782
        },
        "/22732481/sidereel_pubmatic_pmp_728x90_BTF": {
            "728x90": 538174551
        },
        "/22732481/spin_sidereel_review_page_300x250_atf": {
            "300x600": 538167878,
            "300x250": 538167878
        },
        "/22732481/sidereel_welcome_300x250_btf_mobile": {
            "300x250": 538174528
        },
        "/22732481/sidereel_pubmatic_pmp_300x250_BTF": {
            "300x250": 538174601
        },
        "no_dfp_kv": false,
        "/22732481/sidereel_responsive_video_main-top": {
            "320x50": 538174442,
            "728x90": 538174442
        },
        "/22732481/sidereel_responsive_welcome_main-bottom": {
            "728x90": 538167891,
            "300x250": 538167891,
            "320x50": 538167891
        },
        "/22732481/sidereel_responsive_genre_sidebar-middle": {
            "300x250": 538174476
        },
        "/22732481/spin_sidereel_episode_guide_300x250_atf": {
            "300x600": 538174763,
            "300x250": 538174763
        },
        "/22732481/sidereel_highest_rated_300x250_atf": {
            "300x600": 538174612,
            "300x250": 538174612
        },
        "/22732481/spin_sidereel_tvshow_300x250_btf": {
            "300x250": 538174552
        },
        "/22732481/sidereel_showlist_300x250_atf": {
            "300x600": 538174492,
            "300x250": 538174492
        },
        "/22732481/spin_sidereel_showlist_300x250_atf": {
            "300x600": 538174765,
            "300x250": 538174765
        },
        "/22732481/sidereel_responsive_leaderboard_main-bottom": {
            "728x90": 538174587,
            "300x250": 538174587,
            "320x50": 538174587
        },
        "/22732481/spin_sidereel_tvlistings_728x90_int10": {
            "728x90": 538174676
        },
        "/22732481/sidereel_responsive_listings_main-middle2-desktop-only": {
            "728x90": 538167861
        },
        "/22732481/sidereel_responsive_friends_sidebar-top": {
            "300x600": 538174542,
            "300x250": 538174542
        },
        "/22732481/sidereel_responsive_season_sidebar-top-desktop-only": {
            "300x600": 538174408,
            "300x250": 538174408
        },
        "/22732481/spin_sidereel_ros_728x90_btf_2": {
            "728x90": 538174493
        },
        "/22732481/spin_sidereel_news_300x250_atf": {
            "300x600": 538174413,
            "300x250": 538174413
        },
        "/22732481/sidereel_responsive_news_main-bottom": {
            "728x90": 538174538,
            "300x250": 538174538,
            "320x50": 538174538
        },
        "/22732481/sidereel_responsive_genre_sidebar-top": {
            "300x600": 538174405,
            "300x250": 538174405
        },
        "/22732481/spin_sidereel_tvlistings_728x90_atf": {
            "728x90": 538174602,
            "970x250": 538174602
        },
        "/22732481/sidereel_webtv_tvshow_300x250_novideo_atf": {
            "300x600": 538174652,
            "300x250": 538174652
        },
        "/22732481/spin_sidereel_genre_320x50_mtf_mobile": {
            "300x250": 538174611
        },
        "/22732481/sidereel_responsive_welcome_main-top": {
            "320x50": 538174436,
            "728x90": 538174436
        },
        "/22732481/sidereel_responsive_show_main-top": {
            "320x50": 538174481,
            "728x90": 538174481
        },
        "/22732481/spin_sidereel_home_300x250_atf_mobile": {
            "300x250": 538174771
        },
        "/22732481/sidereel_responsive_genre_index_sidebar-bottom": {
            "300x250": 538167865,
            "160x600": 538167865
        },
        "/22732481/sidereel_responsive_show_review_sidebar-bottom": {
            "300x250": 538174548,
            "160x600": 538174548
        },
        "/22732481/sidereel_responsive_episode_guide_main-bottom": {
            "728x90": 538174582,
            "300x250": 538174582,
            "320x50": 538174582
        },
        "/22732481/spin_sidereel_highest_rated_shows_160x600_btf": {
            "160x600": 538167862
        },
        "/22732481/sidereel_responsive_show_main-bottom": {
            "728x90": 538174514,
            "300x250": 538174514,
            "320x50": 538174514
        },
        "/22732481/sidereel_responsive_premiere_finale_cal_sidebar-bottom-desktop-only": {
            "300x250": 538174738,
            "160x600": 538174738
        },
        "/22732481/sidereel_gamut_passback_728x90_atf": {
            "728x90": 538174635
        },
        "/22732481/spin_sidereel_home_300x250_btf": {
            "300x600": 538174541,
            "300x250": 538174541
        },
        "/22732481/sidereel_responsive_highest_rated_main-bottom": {
            "728x90": 538167885,
            "300x250": 538167885,
            "320x50": 538167885
        },
        "max_bucket": 2000,
        "/22732481/sidereel_responsive_show_list_sidebar-bottom": {
            "300x250": 538174425,
            "160x600": 538174425
        },
        "/22732481/sidereel_responsive_activity_feed_sidebar-bottom": {
            "300x250": 538174430,
            "160x600": 538174430
        },
        "/22732481/spin_sidereel_recommendations_160x600_atf": {
            "160x600": 538174559
        },
        "/22732481/spin_sidereel_person_728x90_btf": {
            "728x90": 538174597
        },
        "/22732481/sidereel_responsive_show_event_main-bottom": {
            "728x90": 538174621,
            "300x250": 538174621,
            "320x50": 538174621
        },
        "/22732481/spin_sidereel_newtonight_400x300_atf": {
            "300x600": 538174608,
            "300x250": 538174608
        },
        "/22732481/sidereel_premiere_finale_cal_300x250_atf": {
            "300x600": 538174524,
            "300x250": 538174524
        },
        "/22732481/spin_sidereel_character_300x250_atf": {
            "300x600": 538174807,
            "300x250": 538174807
        },
        "/22732481/sidereel_burst_tier1_passback_728x90_atf": {
            "728x90": 538174568
        },
        "/22732481/sidereel_spin_mobile_web_ros_300x250": {
            "300x250": 538174498
        },
        "/22732481/spin_sidereel_show_airings_728x90_btf": {
            "728x90": 538174809
        },
        "/22732481/sidereel_responsive_news_sidebar-middle": {
            "300x250": 538167894
        },
        "/22732481/spin_sidereel_showlist_728x90_btf": {
            "728x90": 538174732
        },
        "/22732481/sidereel_responsive_webtv_show_sidebar-bottom": {
            "300x250": 538174402,
            "160x600": 538174402
        },
        "/22732481/sidereel_sovrn_160x600_btf": {
            "160x600": 538174638
        },
        "/22732481/sidereel_responsive_activity_feed_main-bottom": {
            "320x50": 538174486,
            "300x250": 538174486
        },
        "/22732481/spin_sidereel_movie_728x90_btf": {
            "728x90": 538174794
        },
        "/22732481/spin_sidereel_tvgenre_160x600_btf": {
            "160x600": 538174623
        },
        "/22732481/sidereel_sovrn_300x250_btf": {
            "300x250": 538174728
        },
        "/22732481/spin_sidereel_home_728x90_btf": {
            "728x90": 538174769,
            "970x250": 538174769
        },
        "/22732481/sidereel_highest_rated_300x250": {
            "300x600": 538174645,
            "300x250": 538174645
        },
        "/22732481/spin_sidereel_webtvindex_300x250_atf": {
            "300x600": 538174609,
            "300x250": 538174609
        },
        "/22732481/sidereel_ros_728x90_btf": {
            "728x90": 538174651
        },
        "/22732481/spin_sidereel_show_list_728x90_atf": {
            "728x90": 538174605,
            "970x250": 538174605
        },
        "/22732481/sidereel_responsive_leaderboard_sidebar-bottom": {
            "300x250": 538174421,
            "160x600": 538174421
        },
        "/22732481/sidereel_review_page_300x250_atf": {
            "300x600": 538174644,
            "300x250": 538174644
        },
        "/22732481/spin_sidereel_tvgenre_728x90_btf": {
            "728x90": 538174496
        },
        "/22732481/sidereel_responsive_post_main-bottom": {
            "728x90": 538174657,
            "300x250": 538174657,
            "320x50": 538174657
        },
        "/22732481/sidereel_responsive_activity_feed_sidebar-top": {
            "300x600": 538174596,
            "300x250": 538174596
        },
        "/22732481/spin_sidereel_season_300x250_atf": {
            "300x600": 538174785,
            "300x250": 538174785
        },
        "/22732481/sidereel_responsive_tracker_sidebar-bottom-desktop-only": {
            "300x250": 538174622,
            "160x600": 538174622
        },
        "/22732481/sidereel_responsive_ssrp_sidebar-top-desktop-only": {
            "300x600": 538174470,
            "300x250": 538174470
        }
    };

// Google Analytics setup.
function setupGA() {
    /* jshint ignore:start */
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-63935000-38', { 'name': 'r1srga' });
    // ga('r1srga.set', 'dimension1', '');
    /* jshint ignore:end */
}

// Rhythm Analytics setup.
function setupRA() {

    var header = {
            doc_type: 'hbwrapper',
            doc_version: 1,
            include_header_list: 'Referer,Accept-Language,User-Agent',
            pub: pub,
            placement: placement,
            app_ver: version,
        };

    ra = function (data, sampleRate) {

        if (!sampleRate) {
            sampleRate = raSampleRate;
        }

        var value = 100 / sampleRate,
            query = '',
            key;

        for (key in header) {
            data[key] = header[key];
        }

        data.ts = new Date().getTime();
        data.sample_rate = value.toFixed(0);

        for (key in data) {
            query += ('&' + key + '=' + encodeURIComponent(data[key]));
        }

        if (rpn <= sampleRate) {
            (new Image()).src = raEndPoint + query.slice(1);
        }

        log('track_ra %s [%s%] ', JSON.stringify(data));

    };

}

// Track using GA.
function track(p1, p2, p3, p4, sampleRate, extra) {

    if (!sampleRate) {
        sampleRate = 100;
    }

    if (!extra) {
        extra = {};
    }

    var value = 100 / sampleRate;

    if (typeof p4 !== 'number') {
        if (sampleRate < 100) {
            p4 = value;
        }
        else {
            p4 = 1;
        }
    }

    if (rpn <= sampleRate) {
        window.ga('r1srga.send', 'event', p1, p2, p3 || '', p4 || 0, extra);
    }

    log('track [%s] [%s] [%s] [%s] [%s] [%s%]', p1, p2, p3 || '', (typeof p4 === 'number' ? p4 : ''), JSON.stringify(extra), sampleRate);

}

// Log.
function log() {

    if (!trace) {
        return;
    }

    if (!window.console) {
        window.console = { log: function() {} };
        window.console.log.apply = function() {};
    }

    console.log.apply(console, arguments);

}

// Prebid bid response handler (called when all bids return or when timeout is reached).
function preBidBidsBackHandler() {

    // Return if this callback already ran or in test mode.
    if (pbjs.adserverRequestSent) {
        return;
    }

    pbjs.adserverRequestSent = true;

    googletag.cmd.push(function () {

        pbjs.que.push(function () {

            // Set the key-value targeting for Prebid bid responses.
            pbjs.setTargetingForGPTAsync();

            // Start DFP and request ads.
            googletag.pubads().refresh();

            log('[logger] enableDFP');
            track('DFP', 'enable', null, null, gaSampleRate);

        });

    });

}

// OpenX Placement mapper
function setOpenXPlacement(adUnit) {

    log('[logger] setOpenXPlacement');

    var openX;

    try {

        for (var i = 0; i < adUnit.bids.length; i++) {
            if (adUnit.bids[i].bidder === 'openx') {
                openX = adUnit.bids[i];
            }
        }

        if (openX) {
            var placementData = OPENX_MAP[adUnit.code];
            if (placementData) {
                var placementId = placementData[Object.keys(placementData)[0]];
                if (placementId) {
                    openX.params.unit = placementId.toString();
                    log('[logger] OpenX used ' + placementId.toString());
                }
            }
        }

    }
    catch (err) {}

}

// AOL Placement mapper
function setAOLPlacement(adUnit) {

    log('[logger] setAOLPlacement');

    var AOL;

    try {

        var i;

        for (i = 0; i < adUnit.bids.length; i++) {
            if (adUnit.bids[i].bidder === 'aol') {
                AOL = adUnit.bids[i];
            }
        }

        if (AOL) {

            for (i = 0; i < adUnit.sizes.length; i++) {
                var size = adUnit.sizes[i].join('x'),
                    map = AOL_MAP[deviceType][size];

                if (map) {
                    AOL.params.placement = map;
                    log('[logger] AOL used ' + map.toString());
                    break;
                }

            }

        }

    }
    catch (err) {}

}

// AOL Placement mapper
function setDEFYMEDIAPlacement(adUnit) {

    log('[logger] setDEFYMEDIAPlacement');

    var DEFYMEDIA;

    try {

        var i;

        for (i = 0; i < adUnit.bids.length; i++) {
            if (adUnit.bids[i].bidder === 'defymedia') {
                DEFYMEDIA = adUnit.bids[i];
            }
        }

        if (DEFYMEDIA) {

            for (i = 0; i < adUnit.sizes.length; i++) {
                var size = adUnit.sizes[i].join('x'),
                    map = DEFYMEDIA_MAP[deviceType][size];

                if (map) {
                    DEFYMEDIA.params.placement = map;
                    log('[logger] DEFYMEDIA used ' + map.toString());
                    break;
                }

            }

        }

    }
    catch (err) {}

}

setupGA();
setupRA();

log('[logger] start');
track('config', 'start', version, null, gaSampleRate);
ra({ event: 'start' }, raSampleRate);

// Prebid command queue.
var pbjs = (window.pbjs = window.pbjs || {});
pbjs.que = pbjs.que || [];

// DFP/GPT command queue.
var googletag = (window.googletag = window.googletag || {});
googletag.cmd = googletag.cmd || [];

// Set price granularity.
pbjs.que.push(function() {
    log('[logger] setPriceGranularity');
    pbjs.setPriceGranularity('auto');
});

// Register to all prebid events.
pbjs.que.push(function() {

    log('[logger] registerPBEvents');

    pbjs.onEvent('auctionInit', function () {
        track('pbEvents', 'auctionInit', null, null, gaSampleRate);
        ra({ event: 'auctionInit' }, raSampleRate);
    });

    pbjs.onEvent('bidRequested', function (data) {
        track('pbEvents', 'bidRequested', data.bidderCode, null, gaSampleRate);
        ra({ event: 'bidRequested', bidder: data.bidderCode }, raSampleRate);
    });

    pbjs.onEvent('bidResponse', function (data) {

        track('pbEvents', 'bidResponse', data.bidderCode + '/' + (data.statusMessage === 'Bid available' ? 'yes' : 'no'), data.timeToRespond, gaSampleRate);
        ra({ event: 'bidResponse', bidder: data.bidderCode, responseTime: data.timeToRespond, bidStatus: data.statusMessage === 'Bid available' ? '1' : '0', late: PREBID_AUCTIONENDED ? '1' : '0', cpm: (parseFloat(data.cpm || 0).toFixed(2) * 100) }, raSampleRate);

        if (data.cpm) {
            track('cpm', 'offer', data.bidderCode, (parseFloat(data.cpm).toFixed(2) * 100), gaSampleRate);
        }

    });

    pbjs.onEvent('auctionEnd', function () {
        PREBID_AUCTIONENDED = true;
        track('pbEvents', 'auctionEnd', null, null, gaSampleRate);
        ra({ event: 'auctionEnd' }, raSampleRate);
    });

    pbjs.onEvent('bidWon', function (data) {

        log('[logger] bidWon bidder [%s] cpm [%s] unit [%s]', data.bidderCode, data.cpm, data.adUnitCode);
        track('pbEvents', 'bidWon', data.bidderCode, null, gaSampleRate);
        ra({ event: 'bidWon', bidder: data.bidderCode, cpm: (parseFloat(data.cpm || 0).toFixed(2) * 100) }, raSampleRate);

        if (data.cpm) {
            track('cpm', 'win', data.bidderCode, (parseFloat(data.cpm).toFixed(2) * 100), gaSampleRate);
        }

    });

    pbjs.onEvent('bidTimeout', function (data) {
        for (var i = 0; i < data.length; i++) {
            track('pbEvents', 'bidTimeout', data[i], null, gaSampleRate);
            ra({ event: 'bidTimeout', bidder: data[i] }, raSampleRate);
        }
    });

    if (window.addEventListener) {
        window.addEventListener('beforeunload', function () {
            if (!PREBID_AUCTIONENDED) {
                track('config', 'unload', null, null, gaSampleRate);
            }
        });
    }

});

// Override some googletag APIs.
googletag.cmd.push(function() {

    // Override enableServices: this will trigger the Prebid auction to start.
    if (typeof googletag.enableServices === 'function') {

        googletag.oenableServices = googletag.enableServices;
        googletag.enableServices = function () {

            track('DFP', 'enableServices', null, null, gaSampleRate);

            // Register prebid ad units and request bids.
            pbjs.que.push(function() {
                if (!PREBID_AUCTIONSTARTED && ADUNITS.length) {
                    pbjs.addAdUnits(ADUNITS);
                    pbjs.requestBids({ bidsBackHandler: preBidBidsBackHandler, timeout: PREBID_TIMEOUT });
                    PREBID_AUCTIONSTARTED = true;
                }
            });

            googletag.oenableServices.apply(this, arguments);

        };

    }

    // Override defineSlot: this will help us detect which ad slots are being used in realtime.
    if (typeof googletag.defineSlot === 'function') {

        googletag.odefineSlot = googletag.defineSlot;
        googletag.defineSlot = function () {

            track('DFP', 'defineSlot', arguments[0], null, gaSampleRate);

            if (ADUNITS.length >= PREBID_MAX_ADUNITS) {
                return;
            }

            // Check if the ad slot matches a prebid ad unit, and add it to the registration queue if so.
            if (PREBID_ADUNITS[arguments[0]] || PREBID_ADUNITS['*']) {

                // Get the ad unit template and extract the ad sizes.
                var adUnit = PREBID_ADUNITS[arguments[0]] || PREBID_ADUNITS['*'],
                    adSizes = arguments[1];

                adUnit = JSON.parse(JSON.stringify(adUnit));

                // Set the ad unit code name.
                adUnit.code = arguments[0];

                // Normalize ad sizes.
                if (adSizes instanceof Array) {

                    // Multiple sizes.
                    if (adSizes[0] instanceof Array) {
                        adUnit.sizes = adSizes;
                    }
                    // Single size.
                    else if (adSizes.length === 2) {
                        adUnit.sizes = [adSizes];
                    }
                    else {
                        return;
                    }

                    adUnit.sizes = adUnit.sizes.slice(0, PREBID_MAX_SIZES);

                    setOpenXPlacement(adUnit);
                    setAOLPlacement(adUnit);
                    setDEFYMEDIAPlacement(adUnit);

                    ADUNITS.push(adUnit);

                }

            }

            return googletag.odefineSlot.apply(this, arguments);

        };

    }


});

// Set targeting.
googletag.cmd.push(function () {
    log('[logger] setDFPTargeting');
    googletag.pubads().setTargeting('prebidWrapper', 'active');
});

// Disable initial DFP server request.
googletag.cmd.push(function() {
    log('[logger] disableDFP');
    googletag.pubads().disableInitialLoad();
    track('DFP', 'disable', null, null, gaSampleRate);
});

})();
