// 기술 스택 태그 클릭 -> 프로젝트/개인 프로젝트 카드 필터링
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
