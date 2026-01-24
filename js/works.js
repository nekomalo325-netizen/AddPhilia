/**
 * Works ページ - フィルター機能
 */

document.addEventListener('DOMContentLoaded', () => {
    initWorksFilter();
});

function initWorksFilter() {
    const filterButtons = document.querySelectorAll('.works-filter__btn');
    const workItems = document.querySelectorAll('.work-item');

    if (!filterButtons.length || !workItems.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;

            // ボタンのアクティブ状態を更新
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // 作品をフィルタリング
            workItems.forEach(item => {
                const category = item.dataset.category;

                if (filter === 'all' || category === filter) {
                    item.style.display = '';
                    item.style.animation = 'fadeIn 0.3s ease-out';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}
