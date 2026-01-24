/**
 * Add Philia - 植物ホバーアニメーション
 * カーソルが通った場所に葉や小花が舞う演出（ツル科植物・ノスタルジック風）
 */

document.addEventListener('DOMContentLoaded', () => {
    // prefers-reduced-motion を尊重
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    initBotanicalEffect();
});

function initBotanicalEffect() {
    // ツル科植物風の要素（葉、小花、つぼみ）
    const botanicalTypes = ['🍃', '🌿', '❀', '✿', '❁', '⚘', '𖤣', '𖥧'];

    // ノスタルジック・温かみのあるカラーパレット（黄色、ピンク、オレンジ、白系）
    const botanicalColors = [
        '#E8C87A',  // アンティークゴールド（黄色系）
        '#F5DEB3',  // ウィートベージュ（クリーム白）
        '#E8B4B8',  // ダスティピンク
        '#D4A574',  // キャメルオレンジ
        '#F5C6AA',  // ピーチ（オレンジピンク）
        '#FFF8E7',  // アイボリーホワイト
        '#DEB887',  // バーリーウッド（温かいベージュ）
        '#E6D5B8',  // セピアクリーム
    ];

    let lastEffectTime = 0;
    const effectInterval = 120; // 要素を生成する間隔（ミリ秒）

    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastEffectTime < effectInterval) return;
        lastEffectTime = now;

        // ランダムで要素を生成（25%の確率）
        if (Math.random() > 0.25) return;

        createBotanicalElement(e.clientX, e.clientY, botanicalTypes, botanicalColors);
    });
}

function createBotanicalElement(x, y, types, colors) {
    const element = document.createElement('div');
    element.className = 'botanical-effect';

    // ランダムな植物要素を選択
    const type = types[Math.floor(Math.random() * types.length)];
    element.textContent = type;

    // ランダムな色を適用
    const color = colors[Math.floor(Math.random() * colors.length)];
    element.style.color = color;

    // 位置を設定（少しランダムにずらす）
    const offsetX = (Math.random() - 0.5) * 20;
    const offsetY = (Math.random() - 0.5) * 20;
    element.style.left = `${x + offsetX}px`;
    element.style.top = `${y + offsetY}px`;

    // ランダムなサイズ（小さめ）
    const size = 10 + Math.random() * 8;
    element.style.fontSize = `${size}px`;

    // ランダムな初期回転
    const initialRotation = Math.random() * 360;
    element.style.setProperty('--initial-rotation', `${initialRotation}deg`);

    // ゆっくりとした揺れ（ツルが風に揺れるような動き）
    const swayAmount = 20 + Math.random() * 40;
    const swayDirection = Math.random() > 0.5 ? 1 : -1;
    element.style.setProperty('--sway-x', `${swayAmount * swayDirection}px`);

    // 落下距離
    const fallDistance = 60 + Math.random() * 40;
    element.style.setProperty('--fall-y', `${fallDistance}px`);

    // ゆっくりとしたアニメーション時間（ノスタルジック感）
    const duration = 2.5 + Math.random() * 1.5;
    element.style.animationDuration = `${duration}s`;

    document.body.appendChild(element);

    // アニメーション終了後に要素を削除
    element.addEventListener('animationend', () => {
        element.remove();
    });

    // フォールバック: 5秒後に強制削除
    setTimeout(() => {
        if (element.parentNode) {
            element.remove();
        }
    }, 5000);
}
