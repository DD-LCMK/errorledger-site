import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {
	const games = await getCollection('games');
	const siteUrl = context.site || 'https://errorledger.com';
	const defaultPubDate = new Date('2026-11-24T00:00:00Z');

	const utilityItems = [
		{
			title: '🛡️ 검지직 (Bzzk) - 최근 48시간 치지직 제재 레이더 & 실시간 방송 보호',
			description: '최근 48시간 치지직 채팅 기상도, 클린봇 vs 매니저 비중, 카테고리별 제재 강도 및 다중 채널 분탕 이력을 분석하는 스트리머 보호 레이더',
			link: '/bzzk',
			pubDate: defaultPubDate
		},
		{
			title: '📥 치지직 & 유튜브 다운로더 - VOD·클립 & 쇼츠 무손실 다운로드',
			description: '네이버 치지직 다시보기(VOD)·클립 및 유튜브 동영상·쇼츠를 최고 화질(4K·1080p FHD) MP4로 내 PC에 저장하는 무료 로컬 유틸리티',
			link: '/chzzk-downloader',
			pubDate: defaultPubDate
		},
		{
			title: '📅 방송 편성표 스튜디오 - 주간/월간 방송 일정표 & PNG 메이커',
			description: '치지직, SOOP, 유튜브 스트리머를 위한 7가지 테마 방송 일정표 제작, 고화질 PNG 저장 및 팬카페·디스코드 공지 복사 도구',
			link: '/schedule',
			pubDate: defaultPubDate
		},
		{
			title: '🧠 스트리머 & 시청자 16유형 MBTI 성격 검사',
			description: '생방송 소통 및 자기소개용 무료 3분 MBTI 정밀 성격 유형 테스트',
			link: '/mbti',
			pubDate: defaultPubDate
		}
	];

	return rss({
		title: `${SITE_TITLE} - 방송용 웹게임 & 도구 모음`,
		description: SITE_DESCRIPTION,
		site: siteUrl,
		items: [
			...utilityItems,
			...games.map((game) => ({
				title: `${game.data.icon} ${game.data.title} - ${game.data.tagline}`,
				description: game.data.description,
				link: game.id === 'fortune' ? '/fortune' : `/games/${game.id}`,
				pubDate: defaultPubDate
			}))
		]
	});
}