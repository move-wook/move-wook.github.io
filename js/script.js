// 기술 스택(실무 적용) 태그 클릭 -> 프로젝트 카드 필터링
document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.stack-tag');
  const allCards = document.querySelectorAll('.project-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tag = btn.dataset.tag;
      const isAllButton = tag === 'all';

      // 활성 버튼 토글: "전체"를 누르면 나머지 해제, 다른 태그는 다중 선택 가능
      if (isAllButton) {
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
      } else {
        document.querySelector('.stack-tag[data-tag="all"]')?.classList.remove('active');
        btn.classList.toggle('active');
      }

      const activeTags = Array.from(filterButtons)
        .filter((b) => b.classList.contains('active') && b.dataset.tag !== 'all')
        .map((b) => b.dataset.tag);

      // 활성 태그가 없으면 전체 보기로 복귀
      if (activeTags.length === 0) {
        document.querySelector('.stack-tag[data-tag="all"]')?.classList.add('active');
        allCards.forEach((card) => card.classList.remove('hidden'));
        return;
      }

      allCards.forEach((card) => {
        const cardTags = (card.dataset.tags || '').split(' ');
        const matches = activeTags.some((t) => cardTags.includes(t));
        card.classList.toggle('hidden', !matches);
      });
    });
  });
});

// 스크롤 위치에 따라 네비게이션 현재 섹션 하이라이트
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = Array.from(navLinks)
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  if (!('IntersectionObserver' in window) || sections.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = `#${entry.target.id}`;
        navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === id));
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );

  sections.forEach((s) => observer.observe(s));
});
